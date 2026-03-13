import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getRoomById, getMessages, postMessage } from "../services/api";
import { Helmet } from "react-helmet-async";

const MAX_CHARS = 500;

const EMOJI_LIST = [
  "😀","😂","😍","🥰","😎","🤔","😢","😡","🥳","🤩",
  "👍","👎","🙌","🔥","❤️","💔","✨","🎉","🤣","😭",
  "🙏","💯","🤦","🤷","👀","💪","🫡","😴","🤯","😇",
  "🍕","🍔","🎮","🎵","🚀","⚽","🌙","☀️","🌈","🐶",
];

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const TYPING_TIMEOUT = 2000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns remaining milliseconds until `expiresAt`, or 0 if already expired. */
const getRemainingMs = (expiresAt) => Math.max(0, new Date(expiresAt).getTime() - Date.now());

/** Formats milliseconds into a smart human-readable countdown.
 *  < 30 min  → HH:MM:SS
 *  < 30 days → Xd Yh
 *  < 365 days → Xmo Yd
 *  ≥ 365 days → Xyr Ymo
 */
const formatCountdown = (ms) => {
  if (!ms) return null;
  const totalSec = Math.floor(ms / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHrs = Math.floor(totalSec / 3600);
  const totalDays = Math.floor(totalSec / 86400);

  const pad = (n) => String(n).padStart(2, "0");

  if (totalMin < 30) {
    // HH:MM:SS
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  } else if (totalDays < 30) {
    // Xd Yh
    const d = totalDays;
    const h = totalHrs % 24;
    return `${d}d ${h}h`;
  } else if (totalDays < 365) {
    // Xmo Yd
    const mo = Math.floor(totalDays / 30);
    const d = totalDays % 30;
    return `${mo}mo ${d}d`;
  } else {
    // Xyr Ymo
    const yr = Math.floor(totalDays / 365);
    const mo = Math.floor((totalDays % 365) / 30);
    return `${yr}yr`;
  }
};

const formatTime = (ts) => {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const getInitials = (name = "") => name.slice(0, 1).toUpperCase() || "?";

const avatarColors = [
  "bg-primary", "bg-secondary", "bg-accent",
  "bg-info", "bg-success", "bg-warning",
];

const getAvatarColor = (name = "") => {
  let hash = 0;
  for (let c of name) hash += c.charCodeAt(0);
  return avatarColors[hash % avatarColors.length];
};

// ─── Message Bubble ───────────────────────────────────────────────────────────

const ChatBubble = ({ msg, isMine }) => (
  <div className={`chat ${isMine ? "chat-end" : "chat-start"} group animate-fade-in-up`}>
    {!isMine && (
      <div className="chat-image avatar items-end">
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(msg.senderName)} ring-2 ring-base-200 ring-offset-1`}
        >
          {getInitials(msg.senderName)}
        </div>
      </div>
    )}
    <div className="chat-header mb-0.5 text-xs font-semibold opacity-70 flex items-center gap-1.5">
      {!isMine && <span>{msg.senderName}</span>}
      <time className="font-medium opacity-50">{formatTime(msg.createdAt || Date.now())}</time>
      {isMine && msg.delivered && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-primary">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <div
      className={`chat-bubble text-[13.5px] sm:text-[14.5px] leading-relaxed px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm hover:shadow-md transition-shadow max-w-[85vw] sm:max-w-none ${isMine
          ? "bg-primary text-primary-content"
          : "bg-base-100/80 backdrop-blur text-base-content"
        }`}
    >
      {msg.text}
    </div>
  </div>
);

// ─── System Message ───────────────────────────────────────────────────────────

const SystemMsg = ({ text }) => (
  <div className="flex justify-center my-3">
    <span className="text-[11px] font-medium tracking-wide text-base-content/50 bg-base-300/60 px-4 py-1.5 rounded-full shadow-sm">
      {text}
    </span>
  </div>
);

// ─── 404 View ─────────────────────────────────────────────────────────────────

const NotFound = ({ roomId }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-7xl font-black text-base-content/10 mb-4">404</div>
        <h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
        <p className="text-base-content/60 mb-6">
          The room <span className="font-mono text-primary">{roomId}</span> does not exist or has expired.
        </p>
        <button onClick={() => navigate("/room")} className="btn btn-primary rounded-full px-8">
          Back to Rooms
        </button>
      </div>
    </div>
  );
};

// ─── Name Prompt ──────────────────────────────────────────────────────────────

const NamePrompt = ({ roomId, onSet }) => {
  const [val, setVal] = useState("");
  const handle = (e) => {
    e.preventDefault();
    const name = val.trim();
    if (!name) return;
    localStorage.setItem(`bokbok_name_${roomId}`, name);
    onSet(name);
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What's your name?
          </span>
        </h2>
        <p className="text-base-content/60 text-center mb-6 text-sm">
          Choose a display name for this session.
        </p>
        <form onSubmit={handle} className="flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="input input-lg w-full border-white/10"
            placeholder="e.g. Anonymous Panda"
            maxLength={30}
          />
          <button type="submit" className="btn btn-primary btn-lg rounded-full" disabled={!val.trim()}>
            Enter Room
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BokBokRoom = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const [roomInfo, setRoomInfo] = useState(null);
  const [roomStatus, setRoomStatus] = useState("loading"); // loading | ok | notfound
  const [senderName, setSenderName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // countdown string HH:MM:SS

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);
  const textareaRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // ── Validate room ──────────────────────────────────────────────────────────
  useEffect(() => {
    getRoomById(roomId)
      .then((res) => {
        setRoomInfo(res.data?.data);
        setRoomStatus("ok");
      })
      .catch(() => setRoomStatus("notfound"));
  }, [roomId]);

  // ── Get stored name ────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(`bokbok_name_${roomId}`);
    if (stored) setSenderName(stored);
  }, [roomId]);

  // ── Record joined room in localStorage ────────────────────────────────────
  useEffect(() => {
    if (roomStatus === "ok" && roomInfo && senderName) {
      try {
        const joinedRooms = JSON.parse(localStorage.getItem("bokbok_joined_rooms") || "[]");
        const roomData = {
          roomId,
          roomName: roomInfo.roomName,
          nickname: senderName,
          joinedAt: Date.now(),
        };
        const filteredRooms = joinedRooms.filter((r) => r.roomId !== roomId);
        localStorage.setItem("bokbok_joined_rooms", JSON.stringify([roomData, ...filteredRooms]));
      } catch (err) {
        console.error("Failed to save joined room to history", err);
      }
    }
  }, [roomStatus, roomInfo, senderName, roomId]);

  // ── Expiry countdown ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!roomInfo) return;
    // Backend may send expiresAt directly, or createdAt + expireHours
    const expiresAt =
      roomInfo.expiresAt ??
      (roomInfo.createdAt && roomInfo.expireHours
        ? new Date(roomInfo.createdAt).getTime() + roomInfo.expireHours * 3600_000
        : null);
    if (!expiresAt) return;

    const tick = () => setTimeLeft(formatCountdown(getRemainingMs(expiresAt)));
    tick(); // immediate
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [roomInfo]);

  // ── Load initial messages ─────────────────────────────────────────────────
  const loadMessages = useCallback(async (pg) => {
    try {
      const res = await getMessages(roomId, pg);
      const raw = res.data?.data;
      // Normalise: backend may return array OR { messages: [] } shaped object
      const fetched = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.messages)
          ? raw.messages
          : [];
      if (fetched.length < 50) setHasMore(false);
      return fetched;
    } catch {
      return [];
    }
  }, [roomId]);

  useEffect(() => {
    if (roomStatus !== "ok" || !senderName) return;
    loadMessages(1).then((fetched) => {
      setMessages([...fetched].reverse()); // spread avoids mutating the returned array
      setPage(1);
    });
  }, [roomStatus, senderName, loadMessages]);

  // ── Socket setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (roomStatus !== "ok" || !senderName) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join_room", { roomId, senderName });
    });

    socket.on("system_message", (payload) => {
      // backend may send { message } or { text }
      const text = payload?.message ?? payload?.text ?? "";
      setMessages((prev) => [...prev, { _id: Date.now(), type: "system", text }]);
    });

    socket.on("room_users_count", ({ count }) => setUserCount(count));

    socket.on("receive_message", (msg) => {
      if (msg.senderName === senderName) return; // already shown as optimistic message
      setMessages((prev) => [...prev, { ...msg, delivered: false }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
    });

    socket.on("user_typing", ({ senderName: typer }) => {
      setTypingUsers((prev) => prev.includes(typer) ? prev : [...prev, typer]);
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== typer));
      }, TYPING_TIMEOUT + 500);
    });

    socket.on("stop_typing", ({ senderName: typer }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== typer));
    });

    return () => socket.disconnect();
  }, [roomStatus, senderName, roomId]);

  // ── Auto-scroll on mount ──────────────────────────────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "auto" }), 50);
    }
  }, [messages.length, roomStatus, senderName]); // only on initial join

  // ── Infinite scroll ───────────────────────────────────────────────────────
  const handleScroll = useCallback(async () => {
    const el = chatContainerRef.current;
    if (!el || loadingOlder || !hasMore) return;
    if (el.scrollTop < 100) {
      setLoadingOlder(true);
      const nextPage = page + 1;
      const older = await loadMessages(nextPage);
      if (older.length === 0) {
        setHasMore(false);
      } else {
        const prevScrollHeight = el.scrollHeight;
        setMessages((prev) => [...[...older].reverse(), ...prev]);
        setPage(nextPage);
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight - prevScrollHeight;
        });
      }
      setLoadingOlder(false);
    }
  }, [loadingOlder, hasMore, page, loadMessages]);

  // ── Typing emitters ───────────────────────────────────────────────────────
  const handleTextChange = (e) => {
    if (e.target.value.length > MAX_CHARS) return;
    setText(e.target.value);
    // auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
    }
    const socket = socketRef.current;
    if (!socket) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("typing", { roomId, senderName });
    }
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit("stop_typing", { roomId, senderName });
    }, TYPING_TIMEOUT);
  };

  const insertEmoji = (emoji) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    if (newText.length > MAX_CHARS) return;
    setText(newText);
    setShowEmoji(false);
    // restore cursor after emoji
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + emoji.length;
    });
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const handleSend = (e) => {
    e?.preventDefault();
    const msg = text.trim();
    if (!msg || !socketRef.current) return;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      senderName,
      text: msg,
      createdAt: new Date().toISOString(),
      delivered: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setText("");
    // reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);

    // Stop typing
    clearTimeout(typingTimerRef.current);
    isTypingRef.current = false;
    socketRef.current.emit("stop_typing", { roomId, senderName });

    // Socket emit only — backend's send_message handler already persists to DB
    socketRef.current.emit("send_message", { roomId, senderName, text: msg }, (ack) => {
      if (ack?.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === tempId ? { ...m, delivered: true } : m))
        );
      }
    });
  };

  // ── Invite ────────────────────────────────────────────────────────────────
  const copyInvite = () => {
    const url = `${window.location.origin}/room/${roomId}`;
    if (navigator.share) {
      navigator.share({ title: roomInfo?.roomName || "BokBok Room", url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setInviteCopied(true);
        setTimeout(() => setInviteCopied(false), 2000);
      });
    }
  };
  if (roomStatus === "loading") {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (roomStatus === "notfound") return <NotFound roomId={roomId} />;

  if (!senderName) return <NamePrompt roomId={roomId} onSet={setSenderName} />;

  // ── Render ────────────────────────────────────────────────────────────────
  const roomUrl = `${window.location.origin}/room/${roomId}`;

  return (
    <>
      <Helmet>
        <title>{roomInfo?.roomName ? `${roomInfo.roomName} — BokBok` : "Chat Room — BokBok"}</title>
        <meta name="description" content={`You're inside the "${roomInfo?.roomName || "BokBok"}" chat room. Real-time messaging, no account needed.`} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── Main Shell ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col h-[100dvh] w-full bg-base-100 overflow-hidden">

        {/* ── Top Bar ──────────────────────────────────────────────────────── */}
        <header className="shrink-0 flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-base-200/70 backdrop-blur-xl border-b border-base-content/5 z-20 shadow-sm">

          {/* Left: room name + my name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shrink-0" />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold truncate max-w-[140px] sm:max-w-[260px] leading-tight">
                {roomInfo?.roomName || "Room"}
              </h1>
              <p className="text-[10px] text-base-content/40 leading-none mt-0.5 truncate">
                <span className="text-base-content/70 font-medium">{senderName}</span>
                <span className="mx-1 hidden sm:inline">·</span>
                <span className="font-mono hidden sm:inline text-primary/60">#{roomId?.slice(-6)}</span>
              </p>
            </div>
          </div>

          {/* Right: stats + actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Online pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-success/10 text-success border border-success/20 rounded-full px-2.5 py-1 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              {userCount} online
            </div>
            <span className="badge badge-success badge-sm font-mono font-bold sm:hidden">{userCount}</span>

            {/* Total joined pill — desktop only */}
            {roomInfo?.totalJoined > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 bg-base-content/5 text-base-content/50 border border-base-content/10 rounded-full px-2.5 py-1 text-xs font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 opacity-60">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                </svg>
                {roomInfo.totalJoined} joined
              </div>
            )}

            {/* Timer pill */}
            {timeLeft && (
              <>
                <div className={`hidden sm:flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-xs font-mono font-semibold ${
                  timeLeft <= "00:05:00" ? "bg-error/10 text-error border-error/20 animate-pulse" :
                  timeLeft <= "00:30:00" ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-base-content/5 text-base-content/60 border-base-content/10"
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 opacity-70">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                  </svg>
                  {timeLeft}
                </div>
                <span className={`badge badge-sm font-mono font-semibold sm:hidden ${
                  timeLeft <= "00:05:00" ? "badge-error animate-pulse" :
                  timeLeft <= "00:30:00" ? "badge-warning" : "badge-ghost"
                }`}>{timeLeft}</span>
              </>
            )}

            {/* Share / Invite button */}
            <button
              onClick={() => setShowInvite(true)}
              className="btn btn-sm btn-primary btn-soft gap-1.5 rounded-full px-3 border-0"
              title="Share room link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold">Invite</span>
            </button>

            {/* Leave button */}
            <button
              onClick={() => setShowLeaveModal(true)}
              className="btn btn-sm btn-ghost btn-error gap-1.5 rounded-full px-3 hover:bg-error/10"
              title="Leave room"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold">Leave</span>
            </button>
          </div>
        </header>

        {/* ── Messages ─────────────────────────────────────────────────────── */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="w-full max-w-3xl mx-auto px-3 sm:px-5 py-4 flex flex-col gap-0.5 min-h-full">
            {loadingOlder && (
              <div className="flex justify-center py-3">
                <span className="loading loading-spinner loading-sm text-primary/50" />
              </div>
            )}
            {!hasMore && messages.length > 0 && <SystemMsg text="Beginning of conversation" />}
            {messages.map((msg) =>
              msg.type === "system" ? (
                <SystemMsg key={msg._id} text={msg.text} />
              ) : (
                <ChatBubble key={msg._id} msg={msg} isMine={msg.senderName === senderName} />
              )
            )}
            <div ref={bottomRef} className="h-2" />
          </div>
        </div>

        {/* ── Composer ─────────────────────────────────────────────────────── */}
        <div className="shrink-0 bg-base-200/70 backdrop-blur-xl border-t border-base-content/5 px-3 sm:px-5 pt-2 pb-3 sm:pb-4 z-20">
          <div className="w-full max-w-3xl mx-auto">

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="text-xs text-base-content/45 mb-1.5 flex items-center gap-1.5 pl-1">
                <span className="flex gap-0.5">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="w-1 h-1 rounded-full bg-base-content/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
                {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
              </div>
            )}

            {/* Emoji picker */}
            {showEmoji && (
              <div className="mb-2 p-2 sm:p-3 bg-base-100 border border-base-content/10 rounded-2xl shadow-lg grid grid-cols-8 sm:grid-cols-10 gap-0.5 sm:gap-1">
                {EMOJI_LIST.map((em) => (
                  <button key={em} type="button" onClick={() => insertEmoji(em)}
                    className="text-lg sm:text-xl hover:bg-base-200 rounded-lg p-1 transition-colors leading-none">
                    {em}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className={`flex items-end gap-2 bg-base-100/80 border rounded-2xl sm:rounded-3xl px-3 py-2 transition-all ${
              text.length > MAX_CHARS * 0.9 ? "border-error/50" : "border-base-content/10 focus-within:border-primary/40"
            }`}>
              {/* Emoji toggle */}
              <button type="button" onClick={() => setShowEmoji(v => !v)}
                className={`btn btn-ghost btn-xs btn-circle shrink-0 self-end mb-0.5 transition-colors ${
                  showEmoji ? "text-primary bg-primary/10" : "text-base-content/35 hover:text-primary"
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                }}
                placeholder="Message..."
                rows={1}
                className="flex-1 resize-none bg-transparent border-none outline-none text-sm leading-relaxed py-1.5 placeholder:text-base-content/30 min-h-[36px] max-h-[120px] sm:max-h-[160px] overflow-y-auto"
              />

              {/* Counter + Send */}
              <div className="flex flex-col items-center gap-1 shrink-0 self-end">
                {text.length > 0 && (
                  <span className={`text-[10px] font-mono ${text.length > MAX_CHARS * 0.9 ? "text-error" : "text-base-content/30"}`}>
                    {MAX_CHARS - text.length}
                  </span>
                )}
                <button type="button" onClick={handleSend} disabled={!text.trim()}
                  className="btn btn-primary btn-circle btn-sm disabled:opacity-25 disabled:bg-transparent disabled:border-transparent transition-all hover:scale-110 active:scale-90">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Invite Modal ─────────────────────────────────────────────────────── */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowInvite(false)}>
          <div className="bg-base-100 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 sm:pb-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            {/* Pull handle (mobile) */}
            <div className="w-10 h-1 bg-base-content/20 rounded-full mx-auto mb-5 sm:hidden" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight">Invite to Room</h3>
                <p className="text-xs text-base-content/50">Share the link — anyone can join instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-base-200 rounded-2xl p-1.5 pl-3">
              <span className="text-xs font-mono text-base-content/60 truncate flex-1">{roomUrl}</span>
              <button
                onClick={copyInvite}
                className={`btn btn-sm rounded-xl gap-1.5 shrink-0 min-w-[90px] transition-all ${inviteCopied ? "btn-success" : "btn-primary"}`}
              >
                {inviteCopied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                      <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>
            </div>
            <button onClick={() => setShowInvite(false)} className="btn btn-ghost btn-block mt-3 rounded-2xl text-sm">Dismiss</button>
          </div>
        </div>
      )}

      {/* ── Leave Confirm Modal ───────────────────────────────────────────────── */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowLeaveModal(false)}>
          <div className="bg-base-100 w-full sm:max-w-xs rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 sm:pb-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-base-content/20 rounded-full mx-auto mb-5 sm:hidden" />
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-center mb-1">Leave Room?</h3>
            <p className="text-sm text-base-content/50 text-center mb-5">You can rejoin anytime with your saved nickname.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowLeaveModal(false)} className="btn btn-ghost flex-1 rounded-2xl">Cancel</button>
              <button onClick={() => { setShowLeaveModal(false); navigate("/room"); }} className="btn btn-error flex-1 rounded-2xl">Leave</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BokBokRoom;
