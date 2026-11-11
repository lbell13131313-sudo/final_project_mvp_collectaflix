import { Link } from 'react-router-dom';
import { useState } from 'react';

function MobileHeader({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleKeyDown = (e) => { // handles the search only once the enter key is pressed
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
        </>
    );
};

export default MobileHeader;