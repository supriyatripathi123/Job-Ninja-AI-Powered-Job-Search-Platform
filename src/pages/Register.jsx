import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', contact: '', otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setMsg("❌ Please enter your email first.");
      return;
    }
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/send-otp', {
        email: formData.email,
      });
      setMsg(`✅ OTP sent to ${formData.email}`);
      setOtpSent(true);
    } catch (err) {
      setMsg('❌ Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      setMsg("❌ Please verify your email with OTP first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMsg(`✅ ${res.data.msg}`);
    } catch (err) {
      setMsg('❌ Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Gmail" required onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        {!otpSent && (
          <button type="button" onClick={sendOtp} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        )}
        {otpSent && (
          <input name="otp" placeholder="Enter OTP" required onChange={handleChange} />
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;
