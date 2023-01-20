import { MissingParamError } from '@/presentation/controllers/errors'
import { LoadCardsOperation } from '@/presentation/controllers/load-cards'
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports'
import { LoadCards } from '@/use-cases/load-cards'
import { CardsData, CardsRepository } from '@/use-cases/ports'
import { CardsBuilder } from '@test/builders'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { ErrorThrowingUseCaseStub } from '@test/doubles/usecases'
import { WebController } from '@/presentation/controllers'

describe('Load cards controller', () => {
  test('should return 200 and cards ', async () => {
    const cards1: CardsData = CardsBuilder.aCards().build()
    const cards2: CardsData = CardsBuilder.aCards().withDifferentTitleAndId().build()
    const cardsRepositoryWithTwoCards: CardsRepository = new InMemoryCardsRepository(
      [cards1, cards2]
    )
    const usecase: LoadCards = new LoadCards(cardsRepositoryWithTwoCards)
    const loadCardsController = new WebController(new LoadCardsOperation(usecase))   
    const loadCardsRequest: HttpRequest = {
      body: {
        
      }
    }
    const response: HttpResponse = await loadCardsController.handle(loadCardsRequest)
    const loadResult = response.body as CardsData[]
    expect(loadResult.length).toEqual(2)
    expect(response.statusCode).toEqual(200)
  })



  test('should return 500 if load cards use case throws', async () => {
    const errorThrowingLoadCardsUseCase = new ErrorThrowingUseCaseStub()
    const loadCardsController = new WebController(new LoadCardsOperation(errorThrowingLoadCardsUseCase))
    
    const loadCardsRequest: HttpRequest = {
      body: {
        
      }
    }
    const response: HttpResponse = await loadCardsController.handle(loadCardsRequest)
    expect(response.statusCode).toEqual(500)
  })
})
