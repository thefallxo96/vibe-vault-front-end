## VibeVault — Frontend

VibeVault is a music-driven vibe tracker that lets users authenticate through Google/Apple/Spotify (via Supabase + backend routing), explore music, and build their personal vibe experience. This frontend is built with React, fully connected to the VibeVault backend API.

🚀 Live Frontend

(https://vibe-vault-front-end.onrender.com)

🔗 Backend API

https://vibe-vault-back-end.onrender.com

📦 Tech Stack

React

React Router

Axios

Vite (or CRA depending on setup)

Supabase Auth (via backend)

Spotify / Apple Music API integration (coming soon)

🧩 Features

User login via Supabase (Google / Apple / Spotify capable)

Fetches data from Spotify/Apple through backend routes

Clean UI for vibes, tracks, and mood exploration

Responsive interface

Future-ready for storing user vibes + tracks

🔧 Installation

Clone the frontend repo:

git clone https://github.com/thefallxo96/vibevault-frontend.git
cd vibevault-frontend
npm install
npm run dev

🔐 Environment Variables

Create a .env file in the frontend root:

VITE_BACKEND_URL=https://vibe-vault-back-end.onrender.com


More environment variables will be added later once Spotify/Apple are fully integrated.

📡 API Setup

Use a global Axios instance:

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

🚀 Deployment on Render

Push repo to GitHub

Create Static Site on Render

Build command:

npm install && npm run build


Publish directory:

dist


Add environment variable:

VITE_BACKEND_URL=https://vibe-vault-back-end.onrender.com

📸 Screenshots

(Add images later)

📝 License

MIT License.

<br>
