export const search = (query, type) => {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(data => data.json());
};

export const searchAlbums = (query) => {
  return search(query, 'album');
};

export const searchArtists = (query) => {
  return search(query, 'artist');
};

export const searchTracks = (query) => {
  return search(query, 'track');
};

export const searchPlaylists = (query) => {
  return search(query, 'playlist');
};
