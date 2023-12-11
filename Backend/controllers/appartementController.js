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
async function getAppartement(req, res) {
  try {
    // Fetch all clients from the database
    const appartements = await Appartment.find().populate('client', 'name');

    // Respond with the fetched clients
    res.status(200).json(appartements);
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
}
async function deleteAppartement(req, res) {
  try {
    const { id } = req.params;

    const appartement = await Appartment.findById(id);
    if (!appartement) {
      return res.status(404).json({ error: 'Appartement not found' });
    }

    await appartement.deleteOne();

    res.status(200).json({ message: 'Appartement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete appartement' });
  }
}

module.exports = {
    createAppartement,
    getAppartement,
    deleteAppartement
}