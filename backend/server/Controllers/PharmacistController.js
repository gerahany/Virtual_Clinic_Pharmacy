const pharmacistModel = require('../Models/pharmacists');
const Wallet = require('../Models/Wallet');
const { default: mongoose } = require('mongoose');

const EmploymentContract = require('../Models/EmploymentContract'); 
const e = require('express');
const bcrypt = require('bcrypt');

exports.createPharmacist = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      password
    } = req.body;

    console.log('Received data:', req.body); // Log the data received

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPharmacist = new pharmacistModel({
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      password: hashedPassword 
    });
    // Create an employment contract for the doctor
 

    console.log('New Pharmacist:', newPharmacist); 

    const savedPharmacist = await newPharmacist.save();
    console.log('Saved Pharmacist:', savedPharmacist); 

    res.status(201).json(savedPharmacist);
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
};


exports.getPharmacist = async (req, res) => {
    try {
      const pharmacist = await pharmacistModel.find();
      res.status(200).json(pharmacist);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

exports.updatedPharmacist = async (req, res) => {
    try {
      const updated = await pharmacistModel.findByIdAndUpdate(
        req.params.userid,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  
exports.deletePharmacist = async (req, res) => {
    try {
      await pharmacistModel.findByIdAndDelete(req.params.userid);
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };

exports.getPharmacistByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await pharmacistModel.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePharmacistByUsername = async (req, res) => {
  const { username } = req.params; // Extract the username from the URL

  try {
    // Find the pharmacist by username
    const pharmacist = await pharmacistModel.findOne({ username: username });

    if (!pharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found' });
    }

    // Update the pharmacist's information based on the request body
    pharmacist.set(req.body); // This updates only the fields that are present in the request body

    // Save the updated pharmacist document
    const updatedPharmacist = await pharmacist.save();

    res.status(200).json(updatedPharmacist);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.transferRandomSalariesToWallets = async () => {
  try {
    // Step 1: Retrieve all pharmacists
    const pharmacists = await Pharmacist.find();

    // Step 2 and 3: Calculate random salary and update wallet balance for each pharmacist
    for (const pharmacist of pharmacists) {
      const randomSalary = generateRandomSalary(); // Generate a random salary
      await updateWalletBalance(pharmacist._id, randomSalary);
    }

    console.log('Monthly random salary transfer completed.');
  } catch (error) {
    console.error('Error transferring monthly random salaries:', error);
  }
};

// Function to generate a random salary (customize as needed)
const generateRandomSalary = () => {
  // Implement your random salary generation logic here
  // For example, generate a random number within a range
  const minSalary = 2000; // Minimum salary
  const maxSalary = 5000; // Maximum salary
  return Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
};

// Function to update wallet balance for a pharmacist
const updateWalletBalance = async (pharmacistId, salary) => {
  try {
    // Retrieve the wallet for the pharmacist
    const wallet = await Wallet.findOne({ patient: pharmacistId });

    if (wallet) {
      // Update the wallet balance by adding the generated random salary
      wallet.balance += salary;

      // Save the updated wallet
      await wallet.save();
    }
  } catch (error) {
    console.error('Error updating wallet balance:', error);
  }
};








