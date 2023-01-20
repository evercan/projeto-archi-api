'use strict';

const cardsModel = require('../models/cards');

/**
 * Stores a new cards into the database.
 * @param {Object} cards cards object to create.
 * @throws {Error} If the cards is not provided.
 */
module.exports.create = async (cards) => {
    if (!cards)
        throw new Error('Missing cards');

    await cardsModel.create(cards);
};

/**
 * Retrieves a cards by id.
 * @param {String} id cards unique identifier
*/
module.exports.getById = async (id) => {
    const cards = await cardsModel.findById(id);
    return cards;
};