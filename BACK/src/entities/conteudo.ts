import { left, right, Either } from '@/shared'
import { InvalidConteudoError } from '@/entities/errors'

export class Conteudo {
  public readonly value: string

  private constructor (conteudo: string) {
    this.value = conteudo
  }

  public static create (conteudo: string): Either<InvalidConteudoError, Conteudo> {
    if (!Conteudo.validate(conteudo)) {
      return left(new InvalidConteudoError(conteudo))
    }

    return right(new Conteudo(conteudo))
  }

  public static validate (conteudo: string): boolean {
    if (!conteudo) {
      return false
    }

    if (conteudo.trim().length < 2 || conteudo.trim().length > 256) {
      return false
    }

    return true
  }
}
