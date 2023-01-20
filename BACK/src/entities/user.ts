import { Either, left, right } from '@/shared'
import { InvalidLoginError, InvalidSenhaError } from '@/entities/errors'
import { Login, Senha } from '@/entities'

export class User {
  private readonly _login: Login
  private readonly _senha: Senha

  public get login () {
    return this._login
  }

  public get senha () {
    return this._senha
  }

  private constructor (login: Login, senha: Senha) {
    this._login = login
    this._senha = senha
    Object.freeze(this)
  }

  public static create (login: string, senha: string):
    Either< InvalidSenhaError, User> {
    const loginOrError = Login.create(login)
    const senhaOrError = Senha.create(senha)
    if (senhaOrError.isLeft()) {
      return left(new InvalidSenhaError())
    }

    const loginObject: Login = loginOrError.value as Login
    const passwordObject: Senha = senhaOrError.value as Senha

    return right(new User(loginObject, passwordObject))
  }
}
