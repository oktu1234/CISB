import React, { useState } from 'react';
import axios from 'axios';

export default function PolicyForm() {
  const [form, setForm] = useState({ policyID: '', farmerName: '', cropType: '', area: '', sumInsured: '', hash: '', issueDate: '' });
  const [message, setMessage] = useState('');
  const [qrCodeUrl] = useState(null);
  const baseURL = process.env.REACT_APP_API_BASE;
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
        {['policyID', 'farmerName', 'cropType', 'area', 'sumInsured','hash', 'issueDate'].map(field => (
          <div key={field}>
            <label>{field}</label>
            <input type="text" name={field} value={form[field]} onChange={handleChange} required />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {qrCodeUrl && (
        <div>
          <h3>Policy QR Code</h3>
          <img src={qrCodeUrl} alt="Policy QR Code" style={{ maxWidth: '300px' }} />
          <a href={qrCodeUrl} download="policyQR.png">Download QR Code</a>
        </div>
      )}
    </div>
  );
}
