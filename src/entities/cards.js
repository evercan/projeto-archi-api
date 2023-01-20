"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = void 0;
const shared_1 = require("@/shared");
const uuidv4_1 = require("uuidv4");
const validates_1 = require("./validates");
class Cards {
    constructor(titulo, conteudo, lista, id) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.lista = lista;
        if (!id) {
            this.id = (0, uuidv4_1.uuid)();
        }
    }
    static create(ICardsData) {
        const tituloOrError = validates_1.Titulo.create(ICardsData.titulo);
        if (tituloOrError.isLeft()) {
            return (0, shared_1.left)(tituloOrError.value);
        }
        const conteudoOrError = validates_1.Conteudo.create(ICardsData.conteudo);
        if (conteudoOrError.isLeft()) {
            return (0, shared_1.left)(conteudoOrError.value);
        }
        const listaOrError = validates_1.Lista.create(ICardsData.lista);
        if (listaOrError.isLeft()) {
            return (0, shared_1.left)(listaOrError.value);
        }
        const titulo = tituloOrError.value;
        const conteudo = conteudoOrError.value;
        const lista = listaOrError.value;
        return (0, shared_1.right)(new Cards(titulo, conteudo, lista));
    }
}
exports.Cards = Cards;
