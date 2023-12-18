const express = require('express');
const Client = require('../models/clientModel');

async function createClient(req, res) {
    try {
        const { name, cin } = req.body;
    
        const newClient = new Client({
          name,
          cin,
        });
    
        const savedClient = await newClient.save();
    
        res.status(201).json(savedClient);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create client' });
      }
}

async function getClient(req, res) {
    try {
      const clients = await Client.find();
  
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  }

module.exports = {
    createClient,
    getClient,
}