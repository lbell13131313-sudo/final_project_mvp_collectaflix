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
        <Header className="header">
            <div className="header-content">
                <nav className="nav-links">
                    <Link to="/" className="nav-link">Explore</Link>
                    <Link to="/collection" className="nav-link">Collection</Link>
                    <Link to="/wantlist" className="nav-link">Wantlist</Link>
                    <Link to="/cart" className="nav-link">Cart</Link>
                </nav>

                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search movies and shows..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </Header>
    );
};

export default Header;