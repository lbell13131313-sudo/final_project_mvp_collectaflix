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

import { WantlistProvider } from './contexts/MediaContext';


// will delete
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

function App() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <WantlistProvider>
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <div>
          <MobileHeader />
        </div>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/wantlist" element={<WantlistPage />} />
        </Routes>
        <div>
          <Taskbar />
        </div>
      </BrowserRouter>
    </WantlistProvider>
  );
};

export default App;