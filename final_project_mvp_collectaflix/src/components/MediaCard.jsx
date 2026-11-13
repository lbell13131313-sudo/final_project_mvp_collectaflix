import { useState, useEffect } from 'react';
import { useWantlist } from '../contexts/WantlistContext';
import { useCart } from '../contexts/CartContext';

function MediaCard({ media }) {
    const { addToWantlist, removeFromWantlist, isInWantlist } = useWantlist();
    const { addToCart, removeFromCart, isInCart } = useCart();
    const [inCollection, setInCollection] = useState(false);
    // check if the media is already in the wantlist 
    const inWantlist = isInWantlist(media.id);

    // check if media is in the cart
    const inCart = isInCart(media.id);

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

    const handleCartClick = () => { // toggles whether an item is in the cart or not
        if (inCart) {
            removeFromCart(media.id);
        } else {
            addToCart(media);
        }
    };

    const poster = `https://image.tmdb.org/t/p/w500${media.poster_path}`;

    return (
        <div className="media-card">
            <div className="media-poster">
                <img 
                    src={poster}
                    alt={media.title}
                />
            </div>
            <div className="media-info">
                <h3 className="media-title">{media.title}</h3>
                <div className="media-details">
                    <span className="media-rating">⭐ {media.vote_average}</span>
                    <span className="media-year">{media.release_date.substring(0, 4)}</span>
                </div>
                <button className={`collection-button ${inCollection ? 'collected' : ''}`} onClick={toggleInCollection}>
                    {inCollection ? '♥ Remove from Collection' : '♡ Add to Collection'}
                </button>
                
                {/* adds and removes media from wantlist context */}
                <button className={`wantlist-button ${inWantlist ? 'wantlisted' : ''}`} onClick={handleWantlistClick}>
                    {inWantlist ? '✖ Remove from Wantlist' : '+ Add to Wantlist'}
                </button>

                <button className={`cart-button ${inCart ? 'added' : ''}`} onClick={handleCartClick}>
                    {inCart ? '🛒 Remove from Cart' : '+ Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default MediaCard;