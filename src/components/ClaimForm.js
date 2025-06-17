import React, { useState } from 'react';
import axios from 'axios';

export default function ClaimForm() {
  const [form, setForm] = useState({ claimID: '', policyID: '', date: '', payout: '' });
  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE || 'localhost:3000';
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/policy`, form);
      setMessage('✅ Claim submitted successfully');
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h3>Submit a Claim</h3>
      <form onSubmit={handleSubmit}>
        {['claimID', 'policyID', 'date', 'payout'].map(field => (
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
