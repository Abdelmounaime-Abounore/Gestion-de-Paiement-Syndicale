const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;