import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('filmFlowFavorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      
      // MIGRATION LOGIC: Add this section
      const migratedFavorites = parsedFavorites.map(item => {
        // If item already has type, keep it
        if (item.type) {
          return item;
        }
        
        // Check multiple ways to determine type
        if (item.first_air_date) {
          // Has first_air_date = TV show
          return { ...item, type: 'tv' };
        } else if (item.name && !item.title) {
          // Has name but no title = TV show
          return { ...item, type: 'tv' };
        } else {
          // Default to movie
          return { ...item, type: 'movie' };
        }
      });
      
      setFavorites(migratedFavorites);
    }
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

  // Toggle favorite status
  const toggleFavorite = (item) => {
    // Determine type
    let type = 'movie';
    
    // Check if it's a TV show
    if (item.first_air_date) {
      type = 'tv';
    } else if (item.name && !item.title) {
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