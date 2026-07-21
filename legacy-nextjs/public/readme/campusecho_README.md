<div align="center">

<img src="https://img.shields.io/badge/CampusEcho-v1.0.0-00ff41?style=for-the-badge&logo=socket.io&logoColor=white" alt="Version" />

# 📡 CampusEcho

**A real-time, ephemeral campus communication platform.**  
Create anonymous channels, share files, and connect — with zero persistence.

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?style=flat-square&logo=redis&logoColor=white)](https://upstash.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## 📸 Screenshots

### Client Interface
![CampusEcho Client UI](public/images/campusecho-client.png)

### Admin Dashboard
![CampusEcho Admin Dashboard](public/images/campusecho-admin.png)

---

## ✨ Features

### 🗣️ Real-Time Chat
- Instant messaging powered by **Socket.IO** WebSockets
- Auto-scrolling message feed with smooth animations
- **System notifications** for user join/leave events
- Message history loaded on room join (last 50 messages)

### 📁 File & Image Sharing
- Drag-and-drop or click-to-upload file attachments
- Inline image previews with click-to-expand
- File download links for non-image attachments
- Auto-cleanup: uploaded files are purged after **30 minutes** via cron job

### 🏠 Ephemeral Rooms (Channels)
- Create or join rooms using a unique **6-character code**
- **Custom TTL** — rooms self-destruct after a configurable idle period (default: 5 min)
- **Private rooms** — hidden from the public channel list, accessible only by code
- **Public rooms** — discoverable by all users on the same server
- Rooms are permanently destroyed when all members leave and the TTL expires

### 🖥️ Multi-Server Architecture
- Discord-inspired sidebar with **dynamic server icons**
- Admins can create, rename, and delete servers live
- Channels are scoped per-server for organized conversations

### 🎨 Identity & Theming
- **Anonymous by default** — no accounts, no sign-up
- Customizable display name, color-coded avatar, and random identity generator
- Three built-in themes switchable at runtime:
  | Theme | Palette | Vibe |
  |---|---|---|
  | `default` | `#0a0a0a` / `#00ff41` | Hacker / Matrix |
  | `dark` | `#121212` / `#bb86fc` | Classic Dark Mode |
  | `uni_blue` | `#f0f4f8` / `#334e68` | Academic / University |

### 📱 Responsive Design
- Mobile-first layout with hamburger sidebar toggle
- Full-screen overlay for seamless mobile navigation
- Fluid transitions powered by Tailwind CSS

### 🔐 Admin Dashboard
- Secure JWT-authenticated admin namespace (`/admin`)
- Real-time overview of active users, rooms, and servers
- **Ban system** — ban users by Socket ID or IP address, with instant force-disconnect
- Room management — delete any room and forcefully disconnect its members
- Server CRUD — create, rename, and delete servers from the dashboard

### 🛡️ Security & Rate Limiting
- bcrypt-hashed admin password (no plain-text secrets)
- JWT tokens with 1-hour expiry for admin sessions
- `express-rate-limit` on login (`5 req / 15 min`) and file uploads (`20 req / 15 min`)
- IP-based ban enforcement at socket connection time
- TLS-secured Redis connection support (`rediss://`)

---

## 🏗️ Architecture

```
campus-echo/
├── server/                  # Node.js + TypeScript backend
│   ├── classes/
│   │   ├── RoomManager.ts   # Redis-backed room lifecycle management
│   │   ├── ServerManager.ts # Server CRUD & default initialization
│   │   └── BanManager.ts    # IP & user ID ban enforcement
│   ├── middleware/          # Express middleware
│   ├── uploads/             # Ephemeral file storage (auto-purged)
│   ├── index.ts             # Main server entry point
│   └── generateHash.js      # CLI tool to generate bcrypt admin hash
│
├── client/                  # React + Vite user-facing app
│   └── src/
│       ├── components/
│       │   ├── LandingPage.tsx       # Lobby / room creation UI
│       │   ├── ChatInterface.tsx     # Main chat view & file upload
│       │   ├── ServerSelector.tsx    # Left sidebar server icons
│       │   ├── ChannelList.tsx       # Channel list per server
│       │   ├── IdentityCustomiser.tsx # Avatar & name settings
│       │   └── ThemeWrapper.tsx      # CSS variable theme injector
│       ├── store.ts          # Zustand global state
│       ├── socket.ts         # Socket.IO client instance
│       └── themes.ts         # Theme token definitions
│
├── admin-client/            # React + Vite admin dashboard app
├── shared/                  # Shared types (if any)
├── docker-compose.yml       # Local Redis via Docker
└── package.json             # Root workspace with `concurrently`
```

### Data Flow

```
Browser (React)  ──WebSocket──▶  Socket.IO Server  ──▶  Redis (Upstash)
                                        │
                              Admin Namespace (/admin)
                              JWT-authenticated socket
```

**Redis Key Schema**

| Key Pattern | Type | Purpose |
|---|---|---|
| `room:{key}:info` | String (JSON) | Room metadata (TTL, name, theme, privacy) |
| `room:{key}:users` | Hash | Active users in a room |
| `messages:{key}` | List | Last 50 messages (RPUSH + LTRIM) |
| `servers` | Hash/List | Server definitions managed by ServerManager |
| `bans:ids` | Set | Banned socket/user IDs |
| `bans:ips` | Set | Banned IP addresses |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20+
- **Redis** — Either [Upstash](https://upstash.com) (cloud, recommended) or Docker (local)

### 1. Clone the Repository

```bash
git clone https://github.com/bhoomik-codes/campus-echo.git
cd campus-echo
```

### 2. Install All Dependencies

```bash
npm run install:all
```

This installs dependencies for the root, `server/`, `client/`, and `admin-client/`.

### 3. Configure Environment Variables

#### `server/.env`

```env
PORT=3000

# Redis Connection — choose one:

# Option A: Upstash (Cloud)
REDIS_URL="rediss://default:<password>@<host>.upstash.io:6379"

# Option B: Local Docker Redis
# REDIS_HOST=localhost
# REDIS_PORT=6379

# Security
JWT_SECRET="generate_a_secure_random_string_here"
ADMIN_HASH=""   # See step 4 below

# CORS (Production Only)
# CLIENT_URL="https://your-client-app.vercel.app"
# ADMIN_URL="https://your-admin-app.vercel.app"
```

#### `client/.env` and `admin-client/.env`

```env
VITE_API_URL="https://your-render-backend-url.onrender.com"
```

> **Local development:** If `VITE_API_URL` is not set, the client defaults to `http://localhost:3000`.

### 4. Generate Admin Password Hash

```bash
cd server
node generateHash.js
```

Copy the printed bcrypt hash and paste it into `ADMIN_HASH` in `server/.env`.

### 5. Start Redis (Local Development)

```bash
# Using Docker (recommended for local dev)
docker-compose up -d
```

### 6. Run the Development Server

```bash
# From the project root — starts all three apps concurrently
npm run dev
```

| Service | URL |
|---|---|
| Backend API | `http://localhost:3000` |
| Client App | `http://localhost:5173` |
| Admin Dashboard | `http://localhost:4000` |

---

## 📦 Scripts

### Root
| Command | Description |
|---|---|
| `npm run dev` | Start server + client + admin concurrently |
| `npm run install:all` | Install all workspace dependencies |

### Server (`/server`)
| Command | Description |
|---|---|
| `npm run dev` | Run with `ts-node` hot-reload |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm start` | Run compiled production server |

### Client & Admin (`/client`, `/admin-client`)
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## ☁️ Deployment

This project is designed for a **split deployment** model:

| Part | Recommended Platform |
|---|---|
| **Server** (Node.js) | [Render](https://render.com) — free tier, auto-deploy from Git |
| **Client** (React/Vite) | [Vercel](https://vercel.com) |
| **Admin Dashboard** | [Vercel](https://vercel.com) |
| **Redis** | [Upstash](https://upstash.com) — serverless Redis with TLS |

### Deployment Checklist

- [ ] Set `JWT_SECRET` and `ADMIN_HASH` as environment variables on Render
- [ ] Set `REDIS_URL` (Upstash `rediss://` connection string) on Render
- [ ] Set `CLIENT_URL` and `ADMIN_URL` on the server for CORS
- [ ] Set `VITE_API_URL` in Vercel dashboard for both frontend apps
- [ ] Ensure `npm run build` succeeds before deploying (`npm start` runs `node dist/index.js`)

---

## 🔌 Socket.IO Events Reference

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `create_room` | `{ name, serverId, ttl, theme, isPrivate, username }` | Create a new channel |
| `join_room` | `{ roomKey, username }` | Join an existing channel by code |
| `send_message` | `{ roomKey, content, type, sender, ... }` | Send a text/image/file message |
| `get_rooms` | — | Request current public room list |
| `get_servers` | — | Request current server list |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `room_created` | `{ roomKey, name, isPrivate }` | Confirmation after room creation |
| `message` | `Message` object | New message broadcast |
| `history` | `Message[]` | Last 50 messages on join |
| `rooms_update` | `Room[]` | Live public room list |
| `servers_update` | `Server[]` | Live server list |
| `force_disconnect` | `string` (reason) | Kicked / banned by admin |

### Admin Namespace (`/admin`)

| Event (Emit) | Description |
|---|---|
| `get_dashboard` | Fetch stats (users, rooms, servers) |
| `ban_user` | `{ userId, ip }` — Ban and kick a user |
| `unban_user` | `{ type: 'id'│'ip', value }` — Lift a ban |
| `delete_room` | Force-close a room |
| `create_server` | Add a new server |
| `rename_server` | `{ id, newName }` |
| `delete_server` | Remove a server |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 + TypeScript |
| HTTP Server | Express 5 |
| WebSockets | Socket.IO 4 |
| Database | Redis (ioredis) via Upstash |
| Auth | JWT (jsonwebtoken) + bcrypt |
| File Upload | Multer |
| Scheduling | node-cron |
| Rate Limiting | express-rate-limit |
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Icons | Lucide React |

---

## 📄 License

This project is for educational purposes. Feel free to fork and adapt.

---

<div align="center">
  Made with ☕ for campus communities
</div>
