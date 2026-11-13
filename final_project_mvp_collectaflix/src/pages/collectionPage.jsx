import { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid';

const CollectionPage = () => {
    const [inCollection, setInCollection] = useState([]);

    useEffect(() => { // if media are added to collection, they get added to the array
        const collection = JSON.parse(localStorage.getItem('inCollection')) || [];
        setInCollection(collection);
    }, []);

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Collection</h2>
                <p>The movies and shows in your collection</p>
            </div>
            {inCollection.length > 0 ? (
                <MediaGrid medias={inCollection} />
            ) : (
                <div className="empty-state">
                    <p>No movies or shows in collection! Start adding some from the explore page!</p>
                </div>
            )}
        </main>
    );
};

export default CollectionPage;