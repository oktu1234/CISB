import React, { useState } from 'react';
import axios from 'axios';

export default function ViewClaim() {
  const [claimID, setClaimID] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${baseURL}/claim/${claimID}`);
      setResult(res.data);
      setError('');
    } catch (err) {
      setError(`❌ Error: ${err.response?.data?.error || err.message}`);
      setResult(null);
    }
  };

  return (
    <div>
      <h3>View Claim</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={claimID} onChange={e => setClaimID(e.target.value)} placeholder="Enter Claim ID" required />
        <button type="submit">Search</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      {error && <p>{error}</p>}
    </div>
  );
}
