import { InvalidSenhaError } from '@/entities/errors'
import { Either, left, right } from '@/shared'

export class Senha {
  private readonly _value: string

  public get value () {
    return this._value
  }

  constructor (senha: string) {
    this._value = senha
    Object.freeze(this)
  }

  public static create (senha: string):
    Either<InvalidSenhaError, Senha> {
    if (valid(senha)) {
      return right(new Senha(senha))
    }

    return left(new InvalidSenhaError())
  }
}

function valid (senha: string): boolean {
  if (!senha) {
    return false
  }

  if (noNumberIn(senha) || tooShort(senha)) {
    return false
  }

  return true
}

function noNumberIn (senha: string) {
  return !(/\d/.test(senha))
}

function tooShort (senha: string) {
  return senha.length < 6
}
