import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from "./components/Header";
import Taskbar from "./components/Taskbar";
import CartPage from "./pages/CartPage";
import CollectionPage from "./pages/CollectionPage";
import ExplorePage from "./pages/ExplorePage";
import WantlistPage from "./pages/WantlistPage";

// will delete
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/wantlist" element={<WantlistPage />} />
      </Routes>
      <Taskbar />
    </BrowserRouter>
  );
};

export default App
