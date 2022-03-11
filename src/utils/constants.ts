export const omdbKey1 = process.env.REACT_APP_OMDB_KEY_1 ?? '';
export const omdbKey2 = process.env.REACT_APP_OMDB_KEY_2 ?? '';

export const baseUrl = `http://omdbapi.com/?apikey=${omdbKey1}`;
