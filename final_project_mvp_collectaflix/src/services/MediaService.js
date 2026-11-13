// const API_KEY_UPCMDB = import.meta.env.VITE_UPCMDB_API_KEY; // connects to .env
// const BASE_URL_UPCMD = import.meta.env.VITE_UPCMDB_BASE_URL;

const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL_TMDB = import.meta.env.VITE_TMDB_BASE_URL;

export async function getPopularMedia() {
    // requests the popular api database
    const response = await fetch(
        `${BASE_URL_TMDB}/3/trending/all/week?api_key=${API_KEY_TMDB}`
    );

    if (!response.ok) {
        throw new Error(`TMDB Error: ${response.status}`);
    }

    const data = await response.json();
    return (data.results ?? []).filter((item) => item.media_type !== 'person'); // returns the media data, while filtering out any person items
};

// attaches a format and price to every media
export function enrichMarketplace(mediaData = []) {
    if (!Array.isArray(mediaData)) {
        return [];
    }
    
    const availableFormats = [
        { type: '4K UHD', basePrice: 24.99 },
        { type: 'Blu-ray', basePrice: 14.99 },
        { type: 'DVD', basePrice: 7.99 },
        { type: 'VHS', basePrice: 12.50 },
        { type: 'HD DVD', basePrice: 5.00},
        { type: 'LaserDisc', basePrice: 50.99}
    ];

    return mediaData.map((media) => {
        // Generate 2 to 3 random format listings per media for demonstration
        const listings = availableFormats
            .filter(() => Math.random() > 0.3)
            .map((fmt) => ({
                format: fmt.type,
                // Add slight price variation to simulate different sellers
                lowestPrice: (fmt.basePrice + Math.random() * 5).toFixed(2),
                forSaleCount: Math.floor(Math.random() * 45) + 1
            }));

        return {
            ...media,
            listings: listings.length ? listings : [{ format: 'DVD', lowestPrice: '9.99', forSaleCount: 3 }]
        };
    });
};

export async function searchMedia(query) {
    // Prevent unnecessary API calls on empty searches
    if (!query || !query.trim()) {
        return [];
    }

    // requests the search results
    const response = await fetch(
        `${BASE_URL_TMDB}/3/search/multi?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error(`Failed to search movies and shows: ${response.status}`);
    }

    const data = await response.json();
    return (data.results ?? []).filter((item) => item.media_type !== 'person'); // returns the search results, while filtering out any person items
};

// gonna have to change
// export async function lookupByUPC(upc) {
    // const response = await fetch(`${BASE_URL_UPCMD}/lookup/${upc}`, {
        // method: 'GET',
        // headers: {
            // 'x-api-key': API_KEY_UPCMDB,
            // 'Accept': 'application/json',
        // },
    // });

    // if (!response.ok) {
        // throw new Error(`UPCMDB Error: ${response.status}`);
    // }

    // const json = await response.json();
    // return json.data; // Returns title, year, format, imdbID, imdbRating, rated, special_features, publisher etc.
// };