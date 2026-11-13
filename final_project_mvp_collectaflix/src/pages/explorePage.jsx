import { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid';
import { getPopularMedia, enrichMarketplace } from '../services/MediaService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function ExplorePage({ searchResults }) {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => { // invokes my service function
            try {
                setLoading(true);
                setError(null);
                const mediaData = await getPopularMedia();
                const enrichedMedia = enrichMarketplace(mediaData.items.slice(0, 20));
                setMedia(enrichedMedia);
            } catch (err) { // error message so if the popular media don't load it sets media to empty
                setError('Failed to load media or enrich media. Please try again later.');
                setMedia([]); // Set to empty array to prevent map errors
            } finally {
                setLoading(false);
            }
        };

        fetchMedia(); // immediately call fetchMedia so the media array has data
    }, []);

    const enrichedSearch = enrichMarketplace(searchResults.items.slice(0, 20));

    const displayMedia = enrichedSearch || media; // if searchResults doesn't have a value then it will display the popular media instead

    // if loading is set to true it will load this return
    if (loading) {
        return (
            <main className="main-content">
                <LoadingSpinner />
            </main>
        );
    }

    // if there is an error message, it will load this return
    if (error) {
        return (
            <main className="main-content">
                <ErrorMessage message={error} />
            </main>
        );
    }

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>{searchResults ? 'Search Results' : 'Popular Media'}</h2>
                <p>Buy and collect your favorite movies and shows</p>
            </div>
            <MediaGrid medias={displayMedia} />
        </main>
    );
};

export default ExplorePage;