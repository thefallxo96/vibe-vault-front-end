export async function searchTracksByMood(mood) {
  const backend = process.env.REACT_APP_BACKEND_URL;

  const tokenRes = await fetch(`${backend}/api/spotify/token`); // ✅ GET
  const { access_token } = await tokenRes.json();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track&limit=20`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  const data = await res.json();

  if (!data.tracks?.items) return [];

  return data.tracks.items
    .filter((track) => track.preview_url)
    .map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      albumArt: track.album.images?.[0]?.url,
      previewUrl: track.preview_url, // ✅ only preview
    }));
}
