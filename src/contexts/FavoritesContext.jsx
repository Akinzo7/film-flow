import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('filmFlowFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('filmFlowFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      // Check if movie already exists
      if (!prevFavorites.some(fav => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  // Remove movie from favorites
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter(movie => movie.id !== movieId)
    );
  };

  // Check if movie is favorited
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Toggle favorite status
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
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