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

async function getClient(req, res) {
    try {
      // Fetch all clients from the database
      const clients = await Client.find();
  
      // Respond with the fetched clients
      res.status(200).json(clients);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  }

module.exports = {
    createClient,
    getClient,
}