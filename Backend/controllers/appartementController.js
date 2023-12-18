const express = require('express');
const Appartment = require('../models/appartementModel');

async function createAppartement(req, res) {
  try {
    const { address, clientId } = req.body;

    const newAppartement = new Appartment({
      address,
      client: clientId,
    });

    const savedAppartement = await newAppartement.save();

    res.status(201).json(savedAppartement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create appartement' });
  }
}
async function getAppartement(req, res) {
  try {
    const appartements = await Appartment.find().populate('client', 'name');

    res.status(200).json(appartements);
  } catch (error) {
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
async function updateAppartement(req, res) {
  const apartmentId = req.params.id;
  const updatedData = req.body;
  
  try {
    const appartement = await Appartment.findByIdAndUpdate(apartmentId, updatedData);
    if (!appartement) {
      return res.status(404).json({ error: 'Appartement not found' });
    }

    return res.status(201).json({ message: 'Apartment updated successfully' });
  } catch (error) {
    console.error('Error updating apartment:', error);
    return res.status(500).json({ error: 'Failed to update apartment' });
  }
}

module.exports = {
    createAppartement,
    getAppartement,
    deleteAppartement,
    updateAppartement
}