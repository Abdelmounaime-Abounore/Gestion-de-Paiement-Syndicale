const express = require('express');
const Appartment = require('../models/appartementModel');

async function createAppartement(req, res) {
  try {
    // Extract the client data from the request body
    const { address, clientId } = req.body;

    // Create a new client object using the client model
    const newAppartement = new Appartment({
      address,
      client: clientId,
    });

    // Save the new client to the database
    const savedAppartement = await newAppartement.save();

    // Respond with the saved client data
    res.status(201).json(savedAppartement);
  } catch (error) {
    // Handle any errors that occur during the creation of the client
    console.error(error);
    res.status(500).json({ error: 'Failed to create client' });
  }
}

module.exports = {
    createAppartement
}