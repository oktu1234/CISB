import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const VerifyQR = () => {
  const [policyID, setPolicyID] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await axios.get(`https://cubalah.eastasia.cloudapp.azure.com/verify-qr/${policyID}`);
      setResult({ success: true, message: res.data.message });
    } catch (err) {
      const msg = err.response?.data?.message || 'Verification failed';
      setResult({ success: false, message: msg });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Verify QR Code
      </Typography>

      <TextField
        label="Policy ID"
        value={policyID}
        onChange={(e) => setPolicyID(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <Button variant="contained" color="primary" onClick={handleVerify} sx={{ mt: 2 }}>
        Verify
      </Button>

      {result && (
        <Typography
          variant="subtitle1"
          color={result.success ? 'success.main' : 'error.main'}
          sx={{ mt: 2 }}
        >
          {result.message}
        </Typography>
      )}
    </Box>
  );
};

export default VerifyQR;

