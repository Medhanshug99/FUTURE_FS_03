import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './Admin.module.css';

const AdminDashboard = () => {
  useDocumentTitle('Admin Dashboard');
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'messages'
  const [menuItems, setMenuItems] = useState([]);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    
    fetchData();
  }, [admin, activeTab, navigate]);

  const fetchData = async () => {
    try {
      if (activeTab === 'menu') {
        const { data } = await api.get('/api/menu');
        setMenuItems(data);
      } else {
        const { data } = await api.get('/api/admin/messages');
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await api.patch(`/api/menu/${id}/toggle`);
      fetchData(); // Refresh list
      toast.success(`Item marked as ${currentStatus ? 'Sold Out' : 'Available'}`);
    } catch (error) {
      toast.error('Failed to toggle availability');
      console.error('Failed to toggle availability', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/admin/messages/${id}`);
      fetchData(); // Refresh list
      toast.success('Message marked as read');
    } catch (error) {
      toast.error('Failed to mark message as read');
      console.error('Failed to mark message as read', error);
    }
  };

  if (!admin) return null;

  return (
    <div className={styles.dashboardPage}>
      <div className={`container ${styles.dashboardContainer}`}>
        <header className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </header>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'menu' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu Manager
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'messages' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Contact Messages
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'menu' && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item._id}>
                      <td><strong>{item.name}</strong></td>
                      <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <span className={`${styles.badge} ${item.available ? styles.badgeSuccess : styles.badgeDanger}`}>
                          {item.available ? 'Available' : 'Sold Out'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleAvailability(item._id, item.available)}
                          className={styles.actionBtn}
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className={styles.messagesList}>
              {messages.length === 0 ? (
                <p>No messages found.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg._id} className={`${styles.messageCard} ${msg.read ? styles.read : ''}`}>
                    <div className={styles.msgHeader}>
                      <div>
                        <strong>{msg.name}</strong> ({msg.email})
                      </div>
                      <div className={styles.msgDate}>
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {msg.phone && <div className={styles.msgPhone}>Phone: {msg.phone}</div>}
                    <p className={styles.msgText}>{msg.message}</p>
                    {!msg.read && (
                      <button 
                        onClick={() => markAsRead(msg._id)}
                        className={styles.readBtn}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
