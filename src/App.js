import './App.css';
import React from 'react';
import PolicyForm from './components/PolicyForm';


function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1><span role="img" aria-label="farm">🌾</span> Crop Insurance Portal</h1>
       <PolicyForm />
    </div>
  );
}

export default App;
