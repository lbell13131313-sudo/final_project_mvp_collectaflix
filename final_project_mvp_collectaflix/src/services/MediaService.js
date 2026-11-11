const API_KEY_UPCMDB = import.meta.env.VITE_UPCMDB_API_KEY; // connects to .env
const BASE_URL_UPCMD = import.meta.env.VITE_UPCMDB_BASE_URL;

const API_KEY_IMDB = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL_IMDB = import.meta.env.VITE_TMDB_BASE_URL

export async function getPopularMedia() {
    const response = await fetch( // requests the popular api database
        `${BASE_URL_IMDB}/popular?api_key=${API_KEY_IMDB}`
    );

    if (!response.ok) {
        throw new Error(`TMDB Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results; // returns the media data
};

export async function lookupByUPC(upc) {
    const response = await fetch(`${BASE_URL_UPCMD}/lookup/${upc}`, {
        method: 'GET',
        headers: {
            'x-api-key': API_KEY_UPCMDB,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`UPCMDB Error: ${response.status}`);
    }

    const json = await response.json();
    return json.data; // Returns title, year, format, imdbID, imdbRating, rated, special_features, publisher etc.
};

export async function searchMedia(query) {
    const response = await fetch( // requests the search results
        `${BASE_URL_IMDB}/search?api_key=${API_KEY_IMDB}&query=${query}`
    );

    if (!response.ok) {
        throw new Error('Failed to search movies');
    }

    const data = await response.json();
    return data.results; // returns the search results
};