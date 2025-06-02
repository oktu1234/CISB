import './App.css';
import React from 'react';
import PolicyForm from './components/PolicyForm';
import ClaimForm from './components/ClaimForm';
import ViewPolicy from './components/ViewPolicy';
import ViewClaim from './components/ViewClaim';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1><span role="img" aria-label="farm">🌾</span> Crop Insurance Portal</h1>
      <PolicyForm />
      <ClaimForm />
      <ViewPolicy />
      <ViewClaim />
    </div>
  );
}

export default App;
