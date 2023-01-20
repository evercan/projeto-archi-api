
import { Either, left, right } from '@/shared';
import { uuid } from 'uuidv4'
import { CardsData } from './cards-data';
import { InvalidTituloError } from './errors';
import { Titulo } from './titulo';
import { Lista } from './lista';
import { Conteudo } from './conteudo';

export class Cards {
  private readonly _titulo: Titulo
  private readonly _conteudo: string
  private readonly _lista: string

  constructor (titulo: Titulo, conteudo: string, lista: string) {
    this._titulo = titulo
    this._conteudo = conteudo
    this._lista = lista
    Object.freeze(this)
  }

  get titulo () {
    return this._titulo
  }

  get conteudo () {
    return this._conteudo
  }

  get lista () {
    return this._lista
  }


  static create (titulo: string, conteudo: string, lista: string): Either<InvalidTituloError, Cards> {
    const titleOrError = Titulo.create(titulo)
    if (titleOrError.isLeft()) {
      return left(titleOrError.value)
    }
    return right(new Cards(titleOrError.value, !conteudo ? '' : conteudo, !lista ? '' : lista))
  }      
}