export class InvalidTituloError extends Error {
    public readonly titulo = 'Titulo Inválido'
    constructor (titulo: string) {
      super('Invalid titulo: ' + titulo + '.')
    }
  }