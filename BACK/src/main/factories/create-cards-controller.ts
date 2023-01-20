import { MongodbCardsRepository } from '@/external/repositories/mongodb'
import { CreateCardsOperation, WebController } from '@/presentation/controllers'
import { CreateCards } from '@/use-cases/create-cards'
import { makeCardsRepository } from './cards-repository'

export const makecreateCardsController = (): WebController => {
  const cardsRepository = makeCardsRepository()  
  const usecase = new CreateCards(cardsRepository)
  const controller = new WebController(new CreateCardsOperation(usecase))
  return controller
}
