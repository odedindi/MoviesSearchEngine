export const omdbKey = process.env.REACT_APP_OMDB_KEY ?? '';

export const baseUrl = `https://omdbapi.com/?apikey=${omdbKey}`;
