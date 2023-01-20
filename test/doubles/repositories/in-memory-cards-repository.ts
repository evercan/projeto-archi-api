import { CardsData, CardsRepository } from '@/use-cases/ports'

export class InMemoryCardsRepository implements CardsRepository {
  private readonly _data: CardsData[]
  private idcounder: number = 0
  private get data () {
    return this._data
  }

  constructor (data: CardsData[]) {
    this._data = data
  }

  public async add (cards: CardsData): Promise<CardsData> {
    cards.id = this.idcounder.toString()
    this.idcounder++
    this._data.push(cards)
    return cards
  }

  public async findById (cardsId: string): Promise<CardsData> {
    const cards = this.data.find(cards => cards.id === cardsId)
    return cards || null
  }

  public async remove (cardsId: string): Promise<void> {
    this.data.splice(this.data.findIndex(cards => cards.id === cardsId), 1)
  }

  public async updateTitle (cardsId: string, newTitle: string): Promise<void> {
    const originalCards = await this.findById(cardsId)
    if (originalCards) {
      originalCards.title = newTitle
    }
  }

  public async updateContent (cardsId: string, newContent: string): Promise<void> {
    const originalCards = await this.findById(cardsId)
    if (originalCards) {
      originalCards.content = newContent
    }
  }

  public async updateList (cardsId: string, newList: string): Promise<void> {
    const originalCards = await this.findById(cardsId)
    if (originalCards) {
      originalCards.lista = newList
    }
  }
}
