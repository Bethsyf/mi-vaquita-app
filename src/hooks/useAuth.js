import { useState, useEffect } from 'react';

const KEY = 'token';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem(KEY);
      try {
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        sessionStorage.removeItem(KEY);
      }
    };
    checkAuth();

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return { isAuthenticated };
};

export { useAuth };
