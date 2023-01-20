import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports'
import { WebController } from '@/presentation/controllers'
import { RemoveCardsOperation } from '@/presentation/controllers/remove-cards'
import { CardsRepository } from '@/use-cases/ports'
import { RemoveCards } from '@/use-cases/remove-cards'
import { CardsBuilder } from '@test/builders'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { ErrorThrowingUseCaseStub } from '@test/doubles/usecases'

describe('Remove cards controller', () => {
  test('should return 200 if successfully removing a cards', async () => {
    const aCards = CardsBuilder.aCards().build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([aCards])
    const usecase = new RemoveCards(cardsRepositoryWithACards)
    const controller = new WebController(new RemoveCardsOperation(usecase))
    const response: HttpResponse = await controller.handle({
      body: {
        cardsId: aCards.id
      }
    })
    expect(response.statusCode).toEqual(200)
    expect(await cardsRepositoryWithACards.findById(aCards.id)).toBeNull()
  })

  test('should return 400 on attemp to remove unexisting cards', async () => {
    const aCards = CardsBuilder.aCards().build()
    const anotherCards = CardsBuilder.aCards().withDifferentTitleAndId().build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([aCards])
    const usecase = new RemoveCards(cardsRepositoryWithACards)
    const controller = new WebController(new RemoveCardsOperation(usecase))
    const response: HttpResponse = await controller.handle({
      body: {
        cardsId: anotherCards.id
      }
    })
    expect(response.statusCode).toEqual(400)
  })

  test('should return 400 if request does not contain cards id', async () => {
    const aCards = CardsBuilder.aCards().build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([aCards])
    const usecase = new RemoveCards(cardsRepositoryWithACards)
    const controller = new WebController(new RemoveCardsOperation(usecase))
    const invalidRequest: HttpRequest = {
      body: {
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
  })

  test('should return 500 if server throws', async () => {
    const aCards = CardsBuilder.aCards().build()
    const errorThrowingRemoveCardsUseCase = new ErrorThrowingUseCaseStub()
    const controller = new WebController(new RemoveCardsOperation(errorThrowingRemoveCardsUseCase))
    const response: HttpResponse = await controller.handle({
      body: {
        cardsId: aCards.id
      }
    })
    expect(response.statusCode).toEqual(500)
  })
})
