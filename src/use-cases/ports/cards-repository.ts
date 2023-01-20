import { CardsData } from './cards-data'

export interface CardsRepository {
  add (cardsData: CardsData): Promise<CardsData>
  update (cardsData: CardsData): Promise<void>
  remove (cardsId: number): Promise<boolean>
  findAllCards (): Promise<CardsData[]>
  findById (cardsId: number): Promise<CardsData>
  updateTitle (cardsId: number, newTitle: string): Promise<void>
  updateContent (cardsId: number, newContent: string): Promise<void>
  updateList (cardsId: number, newList: string): Promise<void>
}
