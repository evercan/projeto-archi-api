import { InvalidTitleError } from '@/entities/errors'
import { MissingParamError } from '@/presentation/controllers/errors'
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports'
import { UpdateCardsOperation } from '@/presentation/controllers/update-cards'
import { CardsData, CardsRepository } from '@/use-cases/ports'
import { UpdateCards, UpdateCardsRequest } from '@/use-cases/update-cards'
import { CardsBuilder } from '@test/builders'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { ErrorThrowingUseCaseStub } from '@test/doubles/usecases'
import { WebController } from '@/presentation/controllers'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'

describe('Update cards controller', () => {
  test('should return 200 and updated cards when cards is updated', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const cardsWithDifferentTitleAndContent: CardsData = CardsBuilder.aCards().withDifferentTitleAndContent().build()
    const changedCards: UpdateCardsRequest = {
      title: cardsWithDifferentTitleAndContent.title,
      content: cardsWithDifferentTitleAndContent.content,
      id: originalCards.id,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const request: HttpRequest = {
      body: changedCards
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])
   
    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const controller = new WebController(new UpdateCardsOperation(usecase))
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(200)
    expect((response.body as CardsData).content).toEqual(changedCards.content)
    expect((response.body as CardsData).title).toEqual(changedCards.title)
  })

  test('should return 400 when trying to update unexisting cards', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const changedCards: UpdateCardsRequest = {
      title: originalCards.title,
      id: originalCards.id,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const request: HttpRequest = {
      body: changedCards
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([])

    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const controller = new WebController(new UpdateCardsOperation(usecase))
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(UnexistingCardsError)
  })

  test('should return 400 when trying to update cards with invalid title', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const changedCards: UpdateCardsRequest = {
      title: '',
      id: originalCards.id,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const request: HttpRequest = {
      body: changedCards
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])
   
    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const controller = new WebController(new UpdateCardsOperation(usecase))
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidTitleError)
  })

  test('should return 400 when request does not contain title nor content', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const cardsWithNoTitleNorContent = {
      id: originalCards.id,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const requestWithNoTitleNorContent: HttpRequest = {
      body: cardsWithNoTitleNorContent
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])

    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const controller = new WebController(new UpdateCardsOperation(usecase))
    const response: HttpResponse = await controller.handle(requestWithNoTitleNorContent)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter: title, content.')
  })

  test('should return 400 when request does not contain cards id', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const cardsWithNoId = {
      title: 'Different title',
      content: originalCards.content,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const requestWithNoTitleNorContent: HttpRequest = {
      body: cardsWithNoId
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])
   
    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const controller = new WebController(new UpdateCardsOperation(usecase))
    const response: HttpResponse = await controller.handle(requestWithNoTitleNorContent)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter: id.')
  })

  test('should return 500 if an error is raised internally', async () => {
    const errorThrowingSignUpUseCaseStub = new ErrorThrowingUseCaseStub()
    const controllerWithStubUseCase = new WebController(new UpdateCardsOperation(errorThrowingSignUpUseCaseStub))
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const cardsWithDifferentTitleAndContent: CardsData = CardsBuilder.aCards().withDifferentTitleAndContent().build()
    const changedCards: UpdateCardsRequest = {
      title: cardsWithDifferentTitleAndContent.title,
      content: cardsWithDifferentTitleAndContent.content,
      id: originalCards.id,
      ownerEmail: originalCards.ownerEmail,
      ownerId: originalCards.ownerId
    }
    const validRequest: HttpRequest = {
      body: changedCards
    }
    const response: HttpResponse = await controllerWithStubUseCase.handle(validRequest)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
