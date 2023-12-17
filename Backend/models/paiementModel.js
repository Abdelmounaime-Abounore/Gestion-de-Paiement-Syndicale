const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
    appartement: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Appartement',
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
})

const Paiement = mongoose.model('Paiement', paiementSchema);


module.exports = Paiement;