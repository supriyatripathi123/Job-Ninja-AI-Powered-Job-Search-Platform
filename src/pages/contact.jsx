
import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMsg('✅ Msg sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponseMsg('❌ Failed to send');
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you. Reach out by filling this form:</p>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
};

export default Contact;
