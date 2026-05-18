import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await api.post('/api/admin/login', { username, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setAdmin(data);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
