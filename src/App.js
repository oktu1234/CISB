import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import PolicyForm from './components/PolicyForm';
import ClaimForm from './components/ClaimForm';
import ViewPolicy from './components/ViewPolicy';
import ViewClaim from './components/ViewClaim';
import VerifyQR from './components/VerifyQR';

const App = () => {
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
          <Route path="/" element={<Box textAlign="center"><Typography variant="h4">Welcome to Crop Insurance Dashboard</Typography></Box>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;