import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const currentDate = new Date();
const PolicyForm = () => {
const hash = Math.random()*1000000*currentDate;
const issueDate = currentDate;
  const [formData, setFormData] = useState({
    policyID: '',
    farmerName: '',
    cropType: '',
    area: '',
    sumInsured: '',
    hash: hash,
    issueDate: issueDate
  });
  const [qrUrl, setQrUrl] = useState('');



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {

    
      // Register policy
      await axios.post('https://cubalah.eastasia.cloudapp.azure.com/policy', formData);

      // Generate QR code
      const qrRes = await axios.post('https://cubalah.eastasia.cloudapp.azure.com/generate-qr', formData);
      setQrUrl(qrRes.data.qrUrl);
    } catch (err) {
      console.error('Error during policy registration or QR generation:', err);
      alert('An error occurred. Please check console for details.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Register New Policy
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Policy ID"
          name="policyID"
          value={formData.policyID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Farmer Name"
          name="farmerName"
          value={formData.farmerName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Crop Type"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Sum Insured"
          name="sumInsured"
          value={formData.sumInsured}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Register & Generate QR
        </Button>
      </form>

      {qrUrl && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">QR Code</Typography>
          <img src={qrUrl} alt="Policy QR Code" style={{ maxWidth: '100%' }} />
        </Box>
      )}
    </Box>
  );
};

export default PolicyForm;
