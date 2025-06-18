import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';

const ViewPolicy = () => {
  const [policyID, setPolicyID] = useState('');
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      setPolicy(null);
      const res = await axios.get(`https://cubalah.eastasia.cloudapp.azure.com/policy/${policyID}`);
      setPolicy(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch policy');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>View Policy</Typography>
      <TextField
        fullWidth
        label="Policy ID"
        variant="outlined"
        value={policyID}
        onChange={(e) => setPolicyID(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {policy && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Policy Details</Typography>
            <Typography><strong>Policy ID:</strong> {policy.policyID}</Typography>
            <Typography><strong>Farmer Name:</strong> {policy.farmerName}</Typography>
            <Typography><strong>Crop Type:</strong> {policy.cropType}</Typography>
            <Typography><strong>Area:</strong> {policy.area}</Typography>
            <Typography><strong>Sum Insured:</strong> {policy.sumInsured}</Typography>
            <Typography><strong>Active:</strong> {policy.active ? 'Yes' : 'No'}</Typography>
            <Typography><strong>Hash:</strong> {policy.hash}</Typography>
            <Typography><strong>Issue Date:</strong> {policy.issueDate}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ViewPolicy;