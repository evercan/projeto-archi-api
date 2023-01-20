import { CardsData } from '../../src/use-cases/ports/cards-data'

export class CardsBuilder {
  private readonly cards: CardsData = {
    titulo: 'my cards',
    conteudo: 'my content',
    lista: 'fdsv sdfdgsd',
    id: 0
  }

  public static aCards (): CardsBuilder {
    return new CardsBuilder()
  }

  public withInvalidTitulo (): CardsBuilder {
    this.cards.titulo = ''
    return this
  }

  public withDifferentTituloAndId (): CardsBuilder {
    this.cards.titulo = 'other titulo'
    this.cards.id = 1
    return this
  }

  public withDifferentTituloAndContent (): CardsBuilder {
    this.cards.titulo = 'other titulo'
    this.cards.conteudo = 'other content'
    return this
  }

  public withDifferentTituloAndContentAndList (): CardsBuilder {
    this.cards.titulo = 'other titulo'
    this.cards.conteudo = 'other content'
    this.cards.lista = 'other list'
    return this
  }

  public build (): CardsData {
    return this.cards
  }
}
