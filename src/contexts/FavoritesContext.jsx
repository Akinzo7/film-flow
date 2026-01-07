import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('filmFlowFavorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      
      // MIGRATION LOGIC: Add type to old favorites
      const migratedFavorites = parsedFavorites.map(item => {
        // If item already has type, keep it
        if (item.type) {
          return item;
        }
        
        // ✅ IMPROVED: Better type detection
        // Check if it has 'name' property (TV shows use 'name' instead of 'title')
        if (item.name && !item.title) {
          return { ...item, type: 'tv' };
        }
        // Check if it has first_air_date but no release_date
        else if (item.first_air_date && !item.release_date) {
          return { ...item, type: 'tv' };
        }
        // Default to movie
        else {
          return { ...item, type: 'movie' };
        }
      });
      
setFavorites(migratedFavorites);    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('filmFlowFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add item to favorites
  const addFavorite = (item) => {
    setFavorites((prevFavorites) => {
      // Check if item already exists
      if (!prevFavorites.some(fav => fav.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  // Remove item from favorites
  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter(item => item.id !== itemId)
    );
  };

  // Check if item is favorited
  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };

  // ✅ IMPROVED: Better type detection in toggleFavorite
  const toggleFavorite = (item) => {
    let type = 'movie'; // default
    
    // Check if the item explicitly has a type property
    if (item.type) {
      type = item.type;
    }
    // TV shows use 'name' instead of 'title'
    else if (item.name && !item.title) {
      type = 'tv';
    }
    // TV shows have first_air_date but no release_date
    else if (item.first_air_date && !item.release_date) {
      type = 'tv';
    }
    // If it has isTVShow flag (some components set this)
    else if (item.isTVShow) {
      type = 'tv';
    }
    
    const itemWithType = { ...item, type };
    
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(itemWithType);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite,
        toggleFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use favorites
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}