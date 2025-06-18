// --- components/SubmitClaim.js ---
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const ClaimForm = () => {
  const [form, setForm] = useState({ claimID: '', policyID: '', date: '', payout: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://cubalah.eastasia.cloudapp.azure.com/claim', form);
      alert('Claim submitted successfully');
    } catch (err) {
      alert('Error submitting claim');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Submit Claim</Typography>
      <TextField fullWidth margin="normal" name="claimID" label="Claim ID" onChange={handleChange} />
      <TextField fullWidth margin="normal" name="policyID" label="Policy ID" onChange={handleChange} />
      <TextField fullWidth margin="normal" name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} onChange={handleChange} />
      <TextField fullWidth margin="normal" name="payout" label="Payout" onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default ClaimForm;
