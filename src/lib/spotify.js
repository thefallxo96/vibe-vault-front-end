// ✅ src/lib/spotify.js

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const authUrl = "https://accounts.spotify.com/api/token";
const searchUrl = "https://api.spotify.com/v1/search";

let accessToken = null;

// 🎫 Get / refresh access token
async function getAccessToken() {
  if (accessToken) return accessToken;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  try {
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;

  } catch (error) {
    console.error("❌ Spotify authorization error:", error);
    return null;
  }
}

// 🎧 Search tracks by mood
export async function searchTracksByMood(mood) {
  const token = await getAccessToken();
  if (!token) return [];

  const query = `${mood} music`;

  try {
    const response = await fetch(
      `${searchUrl}?q=${encodeURIComponent(query)}&type=track&limit=12`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if (!data.tracks?.items) {
      console.warn("⚠️ No tracks found from Spotify.", data);
      return [];
    }

    return data.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists?.[0]?.name || "Unknown Artist",
      albumArt: track.album?.images?.[0]?.url || "/default-art.png",
      previewUrl: track.preview_url, // may be null
    }));

  } catch (err) {
    console.error("❌ Spotify search error:", err);
    return [];
  }
}
