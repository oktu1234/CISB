// src/components/Dashboard.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import PolicyForm from './PolicyForm';
import ClaimForm from './ClaimForm';
import ViewPolicy from './ViewPolicy';
import ViewClaim from './ViewClaim';
import VerifyQR from './VerifyQR';

export default function Dashboard() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Crop Insurance Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/register-policy">Register Policy</Button>
          <Button color="inherit" component={Link} to="/submit-claim">Submit Claim</Button>
          <Button color="inherit" component={Link} to="/view-policies">View Policies</Button>
          <Button color="inherit" component={Link} to="/view-claims">View Claims</Button>
          <Button color="inherit" component={Link} to="/verify-qr">Verify QR</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/register-policy" element={<PolicyForm />} />
          <Route path="/submit-claim" element={<ClaimForm />} />
          <Route path="/view-policies" element={<ViewPolicy />} />
          <Route path="/view-claims" element={<ViewClaim />} />
          <Route path="/verify-qr" element={<VerifyQR />} />
        </Routes>
      </Container>
    </Router>
  );
}
