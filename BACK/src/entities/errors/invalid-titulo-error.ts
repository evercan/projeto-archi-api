export class InvalidTituloError extends Error {
    public readonly titulo = 'InvalidTituloError'
    constructor (titulo: string) {
      super('Invalid titulo: ' + titulo + '.')
    }
  }