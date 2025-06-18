import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyQR() {
  const [claimID] = useState('');
  const [error] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE;

  const verifyQr = async e => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseURL}/verify-qr/${claimID}`);
      if (response.data.success) {
        alert(`✅ QR code is valid for policy: ${response.data.policyID}`);
        console.log(response.data);
    } else {
        alert('❌ QR code invalid or tampered!');
    }
    } catch (err) {
        console.error(err);
        alert('❌ Verification failed');
    }
  };

  return (
    <div>
      <h3>Verify QR</h3>
        <button onClick={() => verifyQr('P123')}>Verify QR</button>
      {error && <p>{error}</p>}
    </div>
  );
}

