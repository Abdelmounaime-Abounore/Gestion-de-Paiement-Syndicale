const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  ClientName: {
    type: String,
    required: true,
  },
  CIN: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;