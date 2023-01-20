import { Either, left, right } from '@/shared'
import { InvalidLoginError } from '@/entities/errors'

export class Login {
  public readonly value: string

  private constructor (login: string) {
    this.value = login
    Object.freeze(this)
  }

  public static create (login: string): Either<InvalidLoginError, Login> {
    if (!login) {
      return right(new Login(login))
    }

    return left(new InvalidLoginError(login))
  }
}
