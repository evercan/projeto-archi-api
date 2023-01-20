import { UpdateCards } from '@/use-cases/update-cards'
import { UpdateCardsOperation, WebController } from '@/presentation/controllers'
import { makeCardsRepository } from '@/main/factories'

export const makeUpdateCardsController = (): WebController => {
  const cardsRepository = makeCardsRepository()
  const usecase = new UpdateCards(cardsRepository)
  const controller = new WebController(new UpdateCardsOperation(usecase))
  return controller
}
