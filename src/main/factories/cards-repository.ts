import { CardsRepository } from '@/use-cases/ports'
import { MongodbCardsRepository } from '@/external/repositories/mongodb'

export const makeCardsRepository = (): CardsRepository => {
  return new MongodbCardsRepository()
}
