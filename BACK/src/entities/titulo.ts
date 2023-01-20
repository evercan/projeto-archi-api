import { left, right, Either } from '@/shared'
import { InvalidTituloError } from '@/entities/errors'

export class Titulo {
  public readonly value: string

  private constructor (titulo: string) {
    this.value = titulo
  }

  public static create (titulo: string): Either<InvalidTituloError, Titulo> {
    if (!Titulo.validate(titulo)) {
      return left(new InvalidTituloError(titulo))
    }

    return right(new Titulo(titulo))
  }

  public static validate (titulo: string): boolean {
    if (!titulo) {
      return false
    }

    if (titulo.trim().length < 2 || titulo.trim().length > 256) {
      return false
    }

    return true
  }
}
