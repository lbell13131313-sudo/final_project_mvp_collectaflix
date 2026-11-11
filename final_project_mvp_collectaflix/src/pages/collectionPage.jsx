import { useState, useEffect } from 'react';
import MediaGrid from '../components/MovieGrid';

const CollectionPage = () => {
    const [inCollection, setInCollection] = useState([]);

    useEffect(() => { // if media are added to collection, they get added to the array
        const collection = JSON.parse(localStorage.getItem('inCollection')) || [];
        setInCollection(collection);
    }, []);

    return (
        <>
        </>
    );
};

export default CollectionPage;