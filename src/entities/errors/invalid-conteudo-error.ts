export class InvalidConteudoError extends Error {
    public readonly conteudo = 'InvalidConteudoError'
    constructor (conteudo: string) {
      super('Invalid conteudo: ' + conteudo + '.')
    }
  }