import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, getPublicRooms, getRoomById } from "../services/api";
import { Helmet } from "react-helmet-async";

const getStoredName = (roomId) => {
  try {
    return localStorage.getItem(`bokbok_name_${roomId}`);
  } catch {
    return null;
  }
};

const Room = () => {
  const navigate = useNavigate();
  const [publicRooms, setPublicRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [createError, setCreateError] = useState("");
  const [joinError, setJoinError] = useState("");

  const fetchPublicRooms = useCallback(async () => {
    try {
      setLoadingRooms(true);
      const res = await getPublicRooms();
      setPublicRooms(res.data?.data || []);
    } catch {
      setPublicRooms([]);
    } finally {
      setLoadingRooms(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicRooms();
  }, [fetchPublicRooms]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setCreateError("");
    const form = e.target;
    const roomName = form.room_name.value.trim();
    const expireHours = parseInt(form.expiration_time.value, 10);
    const isPublic = form.is_public.checked;
    try {
      setCreating(true);
      const res = await createRoom({
        roomName,
        expireHours,
        isPrivate: !isPublic,
      });
      const roomId = res.data?.data?.roomId || res.data?.data?._id;
      document.getElementById("create_room_modal").close();
      form.reset();
      navigate(`/room/${roomId}`);
    } catch (err) {
      setCreateError(err.response?.data?.message || "Failed to create room.");
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setJoinError("");
    const form = e.target;
    const roomId = form.room_id.value.trim();
    const inputName = form.name?.value?.trim() || "";

    try {
      setJoining(true);
      await getRoomById(roomId);

      const storedName = getStoredName(roomId);
      const finalName = inputName || storedName;

      if (!finalName) {
        setJoinError("A name is required for new rooms.");
        return;
      }

      if (finalName) {
        localStorage.setItem(`bokbok_name_${roomId}`, finalName);
      }
      document.getElementById("join_room_modal").close();
      form.reset();
      navigate(`/room/${roomId}`);
    } catch (err) {
      setJoinError(
        err.response?.status === 404
          ? "Room not found. Please check the Room ID."
          : err.response?.data?.message || "Failed to join room.",
      );
    } finally {
      setJoining(false);
    }
  };

  const handleQuickJoin = (roomId) => {
    const existingName = getStoredName(roomId);
    if (existingName) {
      // User already has a name stored for this room, jump straight in
      navigate(`/room/${roomId}`);
      return;
    }

    document.getElementById("join_room_modal").showModal();
    setTimeout(() => {
      const input = document.querySelector(
        "#join_room_modal input[name='room_id']",
      );
      if (input) input.value = roomId;
    }, 50);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pb-20 rounded-4xl">
      <Helmet>
        <title>Rooms — BokBok</title>
        <meta name="description" content="Browse public BokBok chat rooms or create your own. Join a room instantly with just a name — no account required." />
        <link rel="canonical" href="https://bok-bok.vercel.app/room" />
        <meta property="og:title" content="Chat Rooms — BokBok" />
        <meta property="og:description" content="Create or join real-time chat rooms on BokBok. No sign-up needed." />
        <meta property="og:url" content="https://bok-bok.vercel.app/room" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-secondary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Create Room
          </span>
          <br className="hidden md:block" /> and start BokBok-ing!
        </h1>

        <p className="mt-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
          Experience realtime messaging wrapped in a stunning design. BokBok
          brings your conversations to life with uncompromised style and speed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-200">
          <button
            onClick={() =>
              document.getElementById("create_room_modal").showModal()
            }
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Create Room
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              document.getElementById("join_room_modal").showModal()
            }
            className="btn btn-ghost btn-lg rounded-full px-8 border border-base-content/10 hover:bg-base-content/5"
          >
            Join
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Public Rooms Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 animate-fade-in-up animation-delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Public Rooms
            </span>
          </h2>
          <button
            onClick={fetchPublicRooms}
            className="btn btn-ghost btn-sm rounded-full gap-2"
            disabled={loadingRooms}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 ${loadingRooms ? "animate-spin" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Refresh
          </button>
        </div>

        {loadingRooms ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-36 rounded-2xl"></div>
            ))}
          </div>
        ) : publicRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-base-content/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mb-4 opacity-30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <p className="text-lg font-medium">No public rooms yet</p>
            <p className="text-sm mt-1">Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map((room) => (
              <div
                key={room._id || room.roomId}
                className="group bg-base-200/60 hover:bg-base-200 backdrop-blur-sm  rounded-2xl p-5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-black/20 cursor-pointer"
                onClick={() => handleQuickJoin(room._id || room.roomId)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                    {room.roomName?.[0]?.toUpperCase() || "R"}
                  </div>
                  <span className="badge badge-soft badge-primary badge-sm gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Live
                  </span>
                </div>
                <h3 className="font-semibold text-base-content truncate mb-1">
                  {room.roomName}
                </h3>
                <div className="flex items-center justify-between text-xs text-base-content/50">
                  <span className="font-mono truncate mr-2">
                    {(room._id || room.roomId)?.slice(-8)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="badge badge-soft badge-success badge-sm gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      {room.userCount || 0} online
                    </span>
                    {room.totalJoined > 0 && (
                      <span className="badge badge-soft badge-ghost badge-sm gap-1 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 opacity-60">
                          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                        {room.totalJoined} joined
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <>
        {/* Create Room Modal */}
        <dialog
          id="create_room_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-xl md:text-3xl text-center">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create Room
              </span>
            </h3>
            <p className="text-base-content/70 text-center">
              <span className="bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create a new room and start chatting with your friends!
              </span>
            </p>
            <div className="modal-action block">
              <form
                onSubmit={handleCreateRoom}
                className="fieldset bg-base-200 border-base-300 rounded-box p-3 w-full"
              >
                <fieldset className="fieldset">
                  <label className="label">Room Name</label>
                  <input
                    type="text"
                    name="room_name"
                    className="input validator w-full"
                    placeholder="Type Room Name"
                    required
                  />
                  <p className="validator-hint hidden">Required</p>
                </fieldset>

                <label className="fieldset">
                  <span className="label">Expiration Time (max 24h)</span>
                  <input
                    type="number"
                    name="expiration_time"
                    className="input validator w-full"
                    placeholder="Type hours (e.g. 1, 2)"
                    min={1}
                    max={24}
                    required
                  />
                  <span className="validator-hint hidden">Required</span>
                </label>
                <label className="fieldset">
                  <span className="label">Public or Private?</span>
                  <label className="label">
                    <input
                      name="is_public"
                      type="checkbox"
                      defaultChecked={false}
                      className="checkbox"
                    />
                    <span className="ml-2 select-none">
                      Make it public (visible in room list)
                    </span>
                  </label>
                </label>

                {createError && (
                  <p className="text-error text-sm mt-2">{createError}</p>
                )}

                <button
                  className="btn btn-primary rounded-full mt-4 w-full"
                  type="submit"
                  disabled={creating}
                >
                  {creating ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Create Room"
                  )}
                </button>
              </form>

              <form method="dialog" className="flex justify-end pt-2">
                <button className="btn btn-sm btn-outline border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Join Room Modal */}
        <dialog
          id="join_room_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-xl md:text-3xl text-center">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Join Room
              </span>
            </h3>
            <p className="text-base-content/70 text-center">
              <span className="bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                Join an existing room and start chatting with your friends!
              </span>
            </p>
            <div className="modal-action block">
              <form
                onSubmit={handleJoinRoom}
                className="fieldset bg-base-200 border-base-300 rounded-box p-3 w-full"
              >
                <fieldset className="fieldset">
                  <label className="label">Room ID</label>
                  <input
                    type="text"
                    name="room_id"
                    className="input validator w-full"
                    placeholder="Type Room ID"
                    required
                  />
                  <p className="validator-hint hidden">Required</p>
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label">Your Name (Optional if previously joined)</label>
                  <input
                    type="text"
                    name="name"
                    className="input w-full"
                    placeholder="Type Your Name"
                  />
                  <p className="text-xs text-base-content/50 mt-1">Leave blank to use your previously saved name for this room</p>
                </fieldset>

                {joinError && (
                  <p className="text-error text-sm mt-2">{joinError}</p>
                )}

                <button
                  className="btn btn-primary rounded-full mt-4 w-full"
                  type="submit"
                  disabled={joining}
                >
                  {joining ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Join Room"
                  )}
                </button>
              </form>

              <form method="dialog" className="flex justify-end pt-2">
                <button className="btn btn-sm btn-outline border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default Room;
