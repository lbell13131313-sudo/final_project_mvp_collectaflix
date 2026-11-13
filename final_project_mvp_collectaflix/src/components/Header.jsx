import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ onSearch }) {
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
        <Header>
            <nav>
                <Link to="/" className="nav-link">Explore</Link>
                <Link to="/collection" className="nav-link">Collection</Link>
                <Link to="/wantlist" className="nav-link">Wantlist</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
            </nav>
        </Header>
    );
};

export default Header;