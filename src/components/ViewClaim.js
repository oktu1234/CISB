import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';

const ViewClaim = () => {
  const [claimID, setClaimID] = useState('');
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      setClaim(null);
      const res = await axios.get(`https://cubalah.eastasia.cloudapp.azure.com/claim/${claimID}`);
      setClaim(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch claim');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>View Claim</Typography>
      <TextField
        fullWidth
        label="Claim ID"
        variant="outlined"
        value={claimID}
        onChange={(e) => setClaimID(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {claim && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Claim Details</Typography>
            <Typography><strong>Claim ID:</strong> {claim.claimID}</Typography>
            <Typography><strong>Policy ID:</strong> {claim.policyID}</Typography>
            <Typography><strong>Date:</strong> {claim.date}</Typography>
            <Typography><strong>Payout:</strong> {claim.payout}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ViewClaim;