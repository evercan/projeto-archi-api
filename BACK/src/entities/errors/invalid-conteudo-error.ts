export class InvalidConteudoError extends Error {
    public readonly conteudo = 'Conteudo Inválido'
    constructor (conteudo: string) {
      super('Invalid conteudo: ' + conteudo + '.')
    }
  }