const express = require('express');
const Paiement = require('../models/paiementModel');

async function createPaiement(req, res) {
  try {
    const { appartement, month } = req.body;

    const newPaiement = new Paiement({
      appartement,
      month
    });

    const savedAppartement = await newPaiement.save();

    res.status(201).json(savedAppartement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create paiement' });
  }
}

async function getPaiement(req, res) {
  try {
    const appartementId = req.params.appartementId
    const appartementPaiements = await Paiement.find({ appartement: appartementId });
    res.json({ paiements: appartementPaiements})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch paiement' });
  }
}

module.exports = {
  createPaiement,
  getPaiement
}