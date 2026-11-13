import { useState, useEffect } from 'react';
import { useWantlist } from '../contexts/WantlistContext';

function MediaCard({ media }) {
    const { addToWantlist, removeFromWantlist, isInWantlist } = useWantlist();
    const [inCollection, setInCollection] = useState(false);
    // check if the media is already in the wantlist 
    const inWantlist = isInWantlist(media.id);

    useEffect(() => { // uses localstorage to find the media that the user has in their collection
        const collection = JSON.parse(localStorage.getItem('inCollection')) || [];
        const isMediaInCollection = collection.some(col => col.id === media.id);
        setInCollection(isMediaInCollection);
    }, [media.id]);

    const toggleInCollection = () => { // uses localstorage to set media as in collection or no longer in collection
        const collection = JSON.parse(localStorage.getItem('inCollection')) || [];
    
        if (inCollection) {
            const updatedCollection = collection.filter(col => col.id !== media.id);
            localStorage.setItem('inCollection', JSON.stringify(updatedCollection));
            setInCollection(false);
        } else {
            collection.push(media);
            localStorage.setItem('inCollection', JSON.stringify(collection));
            setInCollection(true);
        }
    };

    const handleWantlistClick = () => { // toggles whether an item is in the wantlist or not
        if (inWantlist) {
            removeFromWantlist(media.id);
        } else {
            addToWantlist(media);
        }
    };

    return (
        <>
        </>
    );
};

export default MediaCard;