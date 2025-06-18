import React, { useState } from 'react';
import axios from 'axios';

export default function ViewPolicy() {
  const [policyID, setPolicyID] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [qrURL, setQrURL] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${baseURL}/policy/${policyID}`);
      setResult(res.data);
      setError('');
    } catch (err) {
      setError(`❌ Error: ${err.response?.data?.error || err.message}`);
      setResult(null);
    }
  };

  const fetchQRCode = async () => {
  try {
    const qrRes = await axios.get(`${baseURL}/qrcode/${policyID}`);
    setQrURL(qrRes.data.url);
  } catch (err) {
    setError(`❌ QR Error: ${err.response?.data?.error || err.message}`);
  }
};

  return (
    <div>
      <h3>View Policy</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={policyID} onChange={e => setPolicyID(e.target.value)} placeholder="Enter Policy ID" required />
        <button type="submit">Search</button>
      </form>
      {result && <pre>{JSON.stringify(<div style={{ marginTop: '20px' }}>
          <h3>Policy Details</h3>
          <pre style={{ background: '#f4f4f4', padding: '10px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
          <button onClick={fetchQRCode} style={{ padding: '10px 20px', marginTop: '10px' }}>
            Generate QR Code
          </button>
        </div>)}</pre>}
      {error && <p>{error}</p>}
      {qrURL && (
        <div style={{ marginTop: '20px' }}>
          <h3>QR Code</h3>
          <a href={qrURL} target="_blank" rel="noopener noreferrer">
            <img src={qrURL} alt="Policy QR Code" style={{ width: '200px', border: '1px solid #ccc' }} />
          </a>
          <p>
            <a href={qrURL} download={`policy-${policyID}.png`}>
              Download QR Code
            </a>
          </p>
        </div>
      )}
    </div>
    
  );


}

