import { LoadCards } from '@/use-cases/load-cards'
import { LoadCardsOperation, WebController } from '@/presentation/controllers'
import { makeCardsRepository } from '@/main/factories'

export const makeLoadCardsController = (): WebController => {
  const cardRepository = makeCardsRepository()
  const usecase = new LoadCards(cardRepository)
  const controller = new WebController(new LoadCardsOperation(usecase))
  return controller
}
