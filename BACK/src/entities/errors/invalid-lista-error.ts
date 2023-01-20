export class InvalidListaError extends Error {
    public readonly lista = 'InvalidListaError'
    constructor (lista: string) {
      super('Invalid lista: ' + lista + '.')
    }
  }