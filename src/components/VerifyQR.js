import React, { useState } from 'react';
import axios from 'axios';

export default function ViewClaim() {
  const [claimID] = useState('');
  const [error] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE;

  const handleSubmit = async e => {
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
      <form onSubmit={handleSubmit}>
        <button onClick={() => verifyQr('P123')}>Verify QR</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

