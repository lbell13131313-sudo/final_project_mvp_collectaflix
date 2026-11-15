import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import Taskbar from './components/Taskbar';

import CartPage from './pages/CartPage';
import CollectionPage from './pages/CollectionPage';
import ExplorePage from './pages/ExplorePage';
import WantlistPage from './pages/WantlistPage';

import { WantlistProvider } from './contexts/WantlistContext';
import { CartProvider } from './contexts/CartContext';

import { searchMedia } from './services/MediaService'; 

import ErrorMessage from './components/ErrorMessage';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => { // Handler function to query search
    setError(null);

    try {
      const results = await searchMedia(query);
      setSearchResults(results);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      setSearchResults(null); // resets the results on failure
    }
  }; 

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  };

  return (
    <CartProvider>
      <WantlistProvider>
        <BrowserRouter>
          <div className="app">
            <div className="desktop-only-element">
              <Header onSearch={handleSearch} />
            </div>
            <div className="mobile-only-element">
              <MobileHeader onSearch={handleSearch} />
            </div>
            <Routes>
              <Route path="/" element={<ExplorePage searchResults={searchResults} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/wantlist" element={<WantlistPage />} />

              {/* Catch-all 404 route */}
              <Route
                path="*"
                element={
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2>404 - Page Not Found</h2>
                    <p>The page you are looking for does not exist.</p>
                    <Link to="/">Go back to Explore</Link>
                  </div>
                }
              />
            </Routes>
            <div className="mobile-only-element">
              <Taskbar />
            </div>
          </div>
        </BrowserRouter>
      </WantlistProvider>
    </CartProvider>
  );
};

export default App;