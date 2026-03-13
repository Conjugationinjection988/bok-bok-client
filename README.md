# 🐦 BokBok — Real-Time Chat Rooms

BokBok is a frictionless, ephemeral public chat platform. Create or join real-time chat rooms instantly — **no account, no sign-up required**. Rooms expire automatically, and all messages are deleted when they do.

> **Frontend** — React + Vite + TailwindCSS + DaisyUI  
> **Backend** — [bok-bok-server](https://github.com/SudipMHX/bok-bok-server) (Express + MongoDB + Socket.io)

---

## ✨ Features

- ⚡ **Real-time messaging** via Socket.IO
- 🔐 **No account required** — just pick a nickname per room
- ⏳ **Expiring rooms** — rooms auto-delete after a set time
- 💬 **Typing indicators** & online user count
- 😀 **Emoji picker** built into the composer
- 🔗 **Invite link** — share a room URL with one click (native share on mobile)
- 🌍 **Multiple themes** — Light, Dark, Synthwave, Halloween & more via DaisyUI
- 📱 **Fully responsive** — optimised for mobile, tablet, and desktop
- 🔍 **SEO ready** — per-page meta tags, Open Graph, Twitter Card via `react-helmet-async`
- 📋 **Terms & Privacy** pages included

---

## 🗂️ Project Structure

```
src/
├── components/       # Header, Footer, PageTransition
├── layout/           # MainLayout (with header/footer), RoomLayout (bare)
├── pages/
│   ├── Home.jsx
│   ├── Room.jsx          # Browse & create rooms
│   ├── BokBokRoom.jsx    # Live chat interface
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Terms.jsx
│   ├── Privacy.jsx
│   └── PageNotFound.jsx
├── services/
│   └── api.js        # Axios instance pointing to VITE_BACKEND_URL
├── AppRouter.jsx     # Route definitions with page transitions
└── main.jsx          # App entry — BrowserRouter + HelmetProvider
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A running instance of the [BokBok backend](https://github.com/SudipMHX/bok-bok-server)

### 1. Clone & install

```bash
git clone https://github.com/SudipMHX/bok-bok-client.git
cd bok-bok-client
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

### 3. Run in development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔌 Environment Variables

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL for the REST API (e.g. `https://api.bok-bok.vercel.app/api`) |
| `VITE_SOCKET_URL` | WebSocket server URL (e.g. `https://api.bok-bok.vercel.app`) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Routing | React Router DOM v7 |
| Real-time | Socket.IO Client v4 |
| HTTP | Axios |
| Animations | Framer Motion |
| SEO | react-helmet-async |

---

## 🌐 Routes

| Path | Page |
|---|---|
| `/` | Home — hero & CTA |
| `/room` | Browse public rooms / create a room |
| `/room/:id` | Live chat interface |
| `/about` | About BokBok |
| `/contact` | Contact form |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `*` | 404 Not Found |

---

## 🔒 How Room Auth Works

BokBok uses **localStorage** instead of accounts:

- On joining a room, the chosen nickname is saved as `bokbok_name_<roomId>`.
- On revisiting the same room URL, the saved nickname is restored automatically — skipping the name prompt.
- Joined room history is tracked in `bokbok_joined_rooms` for quick rejoin.
- Theme preference is persisted under the `theme` key and applied before React loads (no flash on reload).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT © [Mahatab Hossen Sudip](https://sudipmhx.pro.bd)
