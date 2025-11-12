// ✅ src/lib/spotify.js
console.log("📡 Backend URL:", process.env.REACT_APP_BACKEND_URL);

export async function searchTracksByMood(mood) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/spotify/search?mood=${encodeURIComponent(mood)}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();

    // ✅ Verify that we got a usable playlist
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️ No playable tracks for mood: ${mood}`);
      return [];
    }

    // ✅ Log for debugging
    console.log(`🎧 Loaded ${data.length} tracks for mood: ${mood}`);
    console.table(data.map((t) => ({
      title: t.title,
      artist: t.artist,
      preview: t.previewUrl ? "✅" : "❌"
    })));

    return data;
  } catch (err) {
    console.error("❌ searchTracksByMood ERROR:", err);
    return [];
  }
}
