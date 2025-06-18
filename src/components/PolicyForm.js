import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://cubalah.eastasia.cloudapp.azure.com';  // Replace with your API URL

const RegisterPolicy = () => {
  const [formData, setFormData] = useState({
    policyID: '',
    farmerName: '',
    cropType: '',
    area: '',
    sumInsured: '',
    hash: '',
    issueDate: ''
  });

  const [qrUrl, setQrUrl] = useState('');
   const [response] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/policy`, formData);
      alert('Policy registered successfully!');
      // Optionally: fetch QR code
      const qrResponse = await axios.post(`${API_URL}/generate-qr`, formData);
      setQrUrl(qrResponse.data.qrUrl);
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Policy</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(field => (
          <div key={field}>
            <label>{field}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {qrUrl && (
        <div>
          <h3>QR Code</h3>
          <img src={qrUrl} alt="Policy QR Code" />
        </div>
      )}
    </div>
  );
};

export default RegisterPolicy;

