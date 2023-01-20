"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsNotFoundError = void 0;
class CardsNotFoundError extends Error {
    constructor() {
        super('Cards not found.');
        this.name = 'CardsNotFoundError';
    }
}
exports.CardsNotFoundError = CardsNotFoundError;
