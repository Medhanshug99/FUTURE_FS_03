import { useState, useEffect } from 'react';
import api from '../services/api';

export const useMenu = (category = null, featured = false) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        let endpoint = '/api/menu';
        if (featured) {
          endpoint = '/api/menu/featured';
        } else if (category && category !== 'All') {
          endpoint = `/api/menu/category/${category.toLowerCase()}`;
        }
        const { data } = await api.get(endpoint);
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [category, featured]);

  return { items, loading, error };
};
