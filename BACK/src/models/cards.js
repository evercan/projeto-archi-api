'use strict';

const mongoose = require('mongoose');

/**
 * cards model schema.
 */
const cardsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true},
    lista: { type: String }
});

module.exports = mongoose.model('cards', cardsSchema);