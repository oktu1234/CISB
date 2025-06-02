import React, { useState } from 'react';
import axios from 'axios';

export default function PolicyForm() {
  const [form, setForm] = useState({ policyID: '', farmerName: '', cropType: '', area: '', sumInsured: '' });
  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:3000';
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/policy`, form);
      setMessage('✅ Policy submitted successfully');
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h3>Register New Policy</h3>
      <form onSubmit={handleSubmit}>
        {['policyID', 'farmerName', 'cropType', 'area', 'sumInsured'].map(field => (
          <div key={field}>
            <label>{field}</label>
            <input type="text" name={field} value={form[field]} onChange={handleChange} required />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
