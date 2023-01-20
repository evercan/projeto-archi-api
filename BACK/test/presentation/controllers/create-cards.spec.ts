import { CreateCardsOperation } from '@/presentation/controllers/create-cards'
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports'
import { CreateCards } from '@/use-cases/create-cards'
import { UnregisteredOwnerError } from '@/use-cases/create-cards/errors'
import { CardsBuilder, UserBuilder } from '@test/builders'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { ErrorThrowingUseCaseStub } from '@test/doubles/usecases'
import { WebController } from '@/presentation/controllers'

describe('Create cards controller', () => {
  test('should return 201 when cards is successfully created', async () => {
    const aCards = CardsBuilder.aCards().build()
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const createCardsController = new WebController(new CreateCardsOperation(createCardsUseCase))
    const validRequest: HttpRequest = {
      body: {
        titulo: aCards.titulo,
        conteudo: aCards.conteudo,
        lista: aCards.lista
      }
    }
    const response: HttpResponse = await createCardsController.handle(validRequest)
    expect(response.statusCode).toBe(201)
  })


  test('should return 400 when required fields are missing from the request', async () => {
    const aCards = CardsBuilder.aCards().build()
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const createCardsUseCase = new CreateCards(emptyCardsRepository, new InMemoryCardsRepository([aCards]))
    const createCardsController = new WebController(new CreateCardsOperation(createCardsUseCase))
    const requestWithoutTitle: HttpRequest = {
      body: {
      }
    }
    const response: HttpResponse = await createCardsController.handle(requestWithoutTitle)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter: title, content, ownerEmail.')
  })

  test('should return 400 when owner is not registered', async () => {
    const aCards = CardsBuilder.aCards().build()
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const createCardsUseCase = new CreateCards(emptyCardsRepository, new InMemoryCardsRepository([aCards]))
    const createCardsController = new WebController(new CreateCardsOperation(createCardsUseCase))
    const requestWithUnregisteredUser: HttpRequest = {
      body: {
        titulo: aCards.titulo,
        conteudo: aCards.conteudo,
        lista: aCards.lista
      }
    }
    const response: HttpResponse = await createCardsController.handle(requestWithUnregisteredUser)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(UnregisteredOwnerError)
  })

  test('should return 500 when server raises', async () => {
    const aCards = CardsBuilder.aCards().build()
    const errorThrowingCreateCardsUseCaseStub = new ErrorThrowingUseCaseStub()
    const createCardsController = new WebController(new CreateCardsOperation(errorThrowingCreateCardsUseCaseStub))
    const validRequest: HttpRequest = {
      body: {
        titulo: aCards.titulo,
        conteudo: aCards.conteudo,
        lista: aCards.lista
      }
    }
    const response: HttpResponse = await createCardsController.handle(validRequest)
    expect(response.statusCode).toBe(500)
  })
})
