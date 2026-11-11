import { createContext, useState, useContext, useEffect } from 'react';

// creating the context for the wantlist
const WantlistContext = createContext();

// creates a custom hook for consuming the context
export function useWantlist() {
  const context = useContext(WantlistContext);
  if (!context) {
    throw new Error('useWantlist must be used within WantlistProvider');
  }
  return context;
};

// creates the provider component for the wantlist
export function WantlistProvider({ children }) {
  const [wantlist, setWantlist] = useState(() => { // checks the local storage for the wantlist, if it cannot be found, returns an empty wantlist
    const saved = localStorage.getItem('wantlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { // whenever wantlist changes, save to local storage
    localStorage.setItem('wantlist', JSON.stringify(wantlist)); 
  }, [wantlist]);

  const addToWantlist = (media) => {
    if (!wantlist.some(m => m.id === media.id)) {
      setWantlist(prev => [...prev, media]);
    }
  };

  // might need to change
  const removeFromWantlist = (mediaId) => {
    setWantlist(prev => prev.filter(media => media.id !== mediaId));
  };

  // might also need to change
  const isInWantlist = (mediaId) => {
    return wantlist.some(media => media.id === mediaId);
  };

  const value = {
    wantlist,
    addToWantlist,
    removeFromWantlist,
    isInWantlist
  };

  return (
    <WantlistContext.Provider value={value}>
      {children}
    </WantlistContext.Provider>
  );
};