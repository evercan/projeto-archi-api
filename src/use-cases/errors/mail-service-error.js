"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailServiceError = void 0;
class MailServiceError extends Error {
    constructor() {
        super('Mail service error.');
        this.name = 'MailServiceError';
    }
}
exports.MailServiceError = MailServiceError;
