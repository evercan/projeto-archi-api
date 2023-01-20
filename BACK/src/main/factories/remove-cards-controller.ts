import { RemoveCards } from '@/use-cases/remove-cards'
import { RemoveCardsOperation, WebController } from '@/presentation/controllers'
import { makeCardsRepository } from '@/main/factories'

export const makeRemoveCardsController = (): WebController => {
  const cardsRepository = makeCardsRepository()
  const usecase = new RemoveCards(cardsRepository)
  const controller = new WebController(new RemoveCardsOperation(usecase))
  return controller
}
