import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import Taskbar from "./components/Taskbar";
import CartPage from "./pages/CartPage";
import CollectionPage from "./pages/CollectionPage";
import ExplorePage from "./pages/ExplorePage";
import WantlistPage from "./pages/WantlistPage";

import { WantlistProvider } from './contexts/WantlistContext';

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
    <WantlistProvider>
      <BrowserRouter>
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
        </Routes>
        <div className="mobile-only-element">
          <Taskbar />
        </div>
      </BrowserRouter>
    </WantlistProvider>
  );
};

export default App;