const express = require('express');
const Client = require('../models/clientModel');

async function createClient(req, res) {
    try {
        // Extract the client data from the request body
        const { name, cin } = req.body;
    
        // Create a new client object using the client model
        const newClient = new Client({
          name,
          cin,
        });
    
        // Save the new client to the database
        const savedClient = await newClient.save();
    
        // Respond with the saved client data
        res.status(201).json(savedClient);
      } catch (error) {
        // Handle any errors that occur during the creation of the client
        console.error(error);
        res.status(500).json({ error: 'Failed to create client' });
      }
}

module.exports = {
    createClient
}