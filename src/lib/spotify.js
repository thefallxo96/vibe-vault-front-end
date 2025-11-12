// ✅ src/lib/spotify.js
console.log("📡 Backend URL:", process.env.REACT_APP_BACKEND_URL);

export async function searchTracksByMood(mood) {
  const backend = process.env.REACT_APP_BACKEND_URL;

  try {
    // 1️⃣ Ask your backend for the Spotify search results
    const res = await fetch(`${backend}/api/spotify/search?mood=${encodeURIComponent(mood)}`);

    if (!res.ok) {
      console.error(`❌ Backend returned error: ${res.status}`);
      return [];
    }

    const data = await res.json();

    // 2️⃣ Verify that we got a usable playlist
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️ No playable tracks for mood: ${mood}`);
      return [];
    }

    // 3️⃣ Log for debugging
    console.log(`🎧 Loaded ${data.length} tracks for mood: ${mood}`);

    return data;
  } catch (error) {
    console.error("❌ searchTracksByMood ERROR:", error);
    return [];
  }
}
