import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Notif from "./notifModal";
export default function NewPackage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    annualPrice: 0,
    discountOnDoctorSessionPrice: 0,
    discountOnMedicineOrders: 0,
    discountOnFamilyMemberSubscription: 0,
  });

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/health-packages', formData)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      style={{
        backgroundColor: 'lightblue', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Health Package Form
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Annual Price"
            variant="outlined"
            type="number"
            name="annualPrice"
            value={formData.annualPrice}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Discount on Doctor Session Price"
            variant="outlined"
            type="number"
            name="discountOnDoctorSessionPrice"
            value={formData.discountOnDoctorSessionPrice}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Discount on Medicine Orders"
            variant="outlined"
            type="number"
            name="discountOnMedicineOrders"
            value={formData.discountOnMedicineOrders}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Discount on Family Member Subscription"
            variant="outlined"
            type="number"
            name="discountOnFamilyMemberSubscription"
            value={formData.discountOnFamilyMemberSubscription}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Health Package
        </Button>
      </Container>
    </Box>
  );
}
