import { left, right, Either } from '@/shared'
import { InvalidListaError } from '@/entities/errors'

export class Lista {
  public readonly value: string

  private constructor (lista: string) {
    this.value = lista
  }

  public static create (lista: string): Either<InvalidListaError, Lista> {
    if (!Lista.validate(lista)) {
      return left(new InvalidListaError(lista))
    }

    return right(new Lista(lista))
  }

  public static validate (lista: string): boolean {
    if (!lista) {
      return false
    }

    if (lista.trim().length < 2 || lista.trim().length > 256) {
      return false
    }

    return true
  }
}
