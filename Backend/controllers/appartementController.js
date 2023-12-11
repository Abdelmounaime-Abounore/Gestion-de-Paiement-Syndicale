const express = require('express');
const Apartment = require('../models/appartementModel');

async function createAppartement(req, res) {
    try {
        // Extract the apartment data from the request body
        const { address, ClientName, CIN, price } = req.body;
    
        // Create a new apartment object using the Apartment model
        const newApartment = new Apartment({
          address,
          ClientName,
          CIN,
          price,
        });
    
        // Save the new apartment to the database
        const savedApartment = await newApartment.save();
    
        // Respond with the saved apartment data
        res.status(201).json(savedApartment);
      } catch (error) {
        // Handle any errors that occur during the creation of the apartment
        console.error(error);
        res.status(500).json({ error: 'Failed to create apartment' });
      }
}

module.exports = {
    createAppartement
}