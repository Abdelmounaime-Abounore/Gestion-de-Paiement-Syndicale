const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
    appartement: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Appartement',
    },
})

const Paiement = mongoose.model('Paiement', paiementSchema);


module.exports = Paiement;