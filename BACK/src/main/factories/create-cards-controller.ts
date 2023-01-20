import { MongodbCardsRepository } from '@/external/repositories/mongodb'
import { CreateCardsOperation, WebController } from '@/presentation/controllers'
import { CreateCards } from '@/use-cases/create-cards'
import { makeCardsRepository } from './cards-repository'

export const makecreateCardsController = (): WebController => {
  const cardsRepository = makeCardsRepository()  
  const usecase = new CreateCards(cardsRepository)
  const controller = new WebController(new CreateCardsOperation(usecase))
  return controller
  // const mongoDbCardsRepository = new MongodbCardsRepository()
  // console.log('chegou até aqui');
  // return RegisterCardsController
  // // const registerCardsUseCase = new postCards(mongoDbCardsRepository)
  // // const registerUserController = new RegisterCardsController(registerCardsUseCase)
  // // return registerUserController
}
