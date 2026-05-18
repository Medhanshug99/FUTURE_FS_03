import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import api from '../../services/api';
import styles from './Contact.module.css';

const Contact = () => {
  useDocumentTitle('Contact Us');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/contact', formData);
      toast.success("Thanks! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left: Contact Info */}
        <div className={styles.infoCol}>
          <h1>Get in Touch</h1>
          <p className={styles.subtitle}>We'd love to hear from you. Drop us a line or visit us in person.</p>
          
          <div className={styles.infoBlocks}>
            <div className={styles.infoBlock}>
              <h3>Visit Us</h3>
              <p>12, Jubilee Hills Road No. 36<br/>Hyderabad, Telangana 500033</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Contact</h3>
              <p>hello@urbanroast.com<br/>+91 98765 43210</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Hours</h3>
              <p>Mon–Fri: 7:30am – 10:00pm<br/>Sat–Sun: 8:00am – 11:00pm</p>
            </div>
          </div>
        </div>

        {/* Right: Form & Map */}
        <div className={styles.formCol}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            


            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
