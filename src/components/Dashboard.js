import React, { useState } from 'react';
import axios from 'axios';

const InsuranceDashboard = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);

  const API_URL = REACT_APP_API_BASE; // 🔑 Replace with your deployed API URL

  const registerPolicy = async () => {
    const policyData = {
      policyID: 'P123',
      farmerName: 'Alice',
      cropType: 'Rice',
      area: 100,
      sumInsured: 50000,
      hash: 'abc123hash',
      issueDate: '2025-06-18'
    };

    try {
      const response = await axios.post(`${API_URL}/policy`, policyData);
      if (response.data.success) {
        alert('✅ Policy registered successfully!');
        if (response.data.qrUrl) {
          setQrCodeUrl(response.data.qrUrl);
        }
      } else {
        alert(`❌ Failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network or server error');
    }
  };

  const submitClaim = async () => {
    const claimData = {
      claimID: 'C123',
      policyID: 'P123',
      date: '2025-06-19',
      payout: 10000
    };

    try {
      const response = await axios.post(`${API_URL}/claim`, claimData);
      if (response.data.success) {
        alert('✅ Claim submitted successfully!');
      } else {
        alert(`❌ Failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network or server error');
    }
  };

  const verifyQr = async () => {
    const policyID = 'P123';  // You can make this dynamic (input box)
    try {
      const response = await axios.get(`${API_URL}/verify/${policyID}`);
      if (response.data.success) {
        setVerifyResult(response.data);
        alert(`✅ QR code is valid for policy: ${response.data.policyID}`);
      } else {
        alert('❌ QR code invalid or tampered!');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Verification failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🌾 Crop Insurance Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={registerPolicy}>Register Policy</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={submitClaim}>Submit Claim</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={verifyQr}>Verify QR</button>
      </div>

      {qrCodeUrl && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Generated QR Code</h3>
          <img src={qrCodeUrl} alt="Policy QR Code" style={{ maxWidth: '300px' }} />
          <br />
          <a href={qrCodeUrl} download="policyQR.png">⬇ Download QR Code</a>
        </div>
      )}

      {verifyResult && (
        <div style={{ marginTop: '1rem' }}>
          <h3>QR Verification Result</h3>
          <pre>{JSON.stringify(verifyResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InsuranceDashboard;
