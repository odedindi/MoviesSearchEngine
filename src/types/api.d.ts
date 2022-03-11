export type MovieFromMoviesSearchResults = {
	Poster: string;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
};

export type APIMoviesSearchResultsSuccess = {
	Response: 'True';
	Search: MovieFromMoviesSearchResults[];
	totalResults: string;
};

export type MoviesSearch = {
	data: MovieFromMoviesSearchResults[];
	totalPages: number;
	noResults: boolean;
};

export type APISearchResultsFailure = {
	Response: 'False';
	Error: string;
};

type Rating = { Source: string; Value: string };

export type Movie = {
	Response: 'True';
	Runtime: string;
	Year: string;
	Rated: string;
	Title: string;
	Ratings: Rating[];
	Plot: string;
	Actors: string;
	Genre: string;
	Director: string;
	Poster: string;
	Awards: string;
	BoxOffice: string;
	Country: string;
	DVD: string;
	Language: string;
	Metascore: string;
	Production: string;
	Released: string;
	Website: string;
	Writer: string;
	imdbID: string;
	imdbRating: string;
	imdbVotes: string;
};
