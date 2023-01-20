"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lista = void 0;
const shared_1 = require("@/shared");
const errors_1 = require("@/entities/errors");
class Lista {
    constructor(lista) {
        this.value = lista;
    }
    static create(lista) {
        if (!Lista.validate(lista)) {
            return (0, shared_1.left)(new errors_1.InvalidListaError(lista));
        }
        return (0, shared_1.right)(new Lista(lista));
    }
    static validate(lista) {
        if (!lista) {
            return false;
        }
        if (lista.trim().length < 2 || lista.trim().length > 256) {
            return false;
        }
        return true;
    }
}
exports.Lista = Lista;
