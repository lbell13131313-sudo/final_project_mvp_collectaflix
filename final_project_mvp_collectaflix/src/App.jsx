import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


// will delete
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => { // Handler function to query search
    const results = await searchMedia(query); 
    setSearchResults(results); 
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