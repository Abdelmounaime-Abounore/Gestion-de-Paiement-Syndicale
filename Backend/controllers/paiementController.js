const express = require('express');
const Paiement = require('../models/paiementModel');

async function createPaiement(req, res) {
    try {
        // Extract the paiement data from the request body
        const { appartement } = req.body;
    
        // Create a new paiement object using the paiement model
        const newPaiement = new Paiement({
          appartement,
        });
    
        // Save the new paiement to the database
        const savedAppartement = await newPaiement.save();
    
        // Respond with the saved paiement data
        res.status(201).json(savedAppartement);
      } catch (error) {
        // Handle any errors that occur during the creation of the paiement
        console.error(error);
        res.status(500).json({ error: 'Failed to create paiement' });
      }
}

module.exports = {
    createPaiement
}