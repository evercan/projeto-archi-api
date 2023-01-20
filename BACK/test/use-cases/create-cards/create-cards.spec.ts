import { UserData, CardsData, UserRepository } from '@/use-cases/ports'
import { CreateCards } from '@/use-cases/create-cards'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { UserBuilder, CardsBuilder } from '@test/builders'

describe('Create cards use case', () => {
  test('should create cards with valid owner and title', async () => {
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const usecase = new CreateCards(emptyCardsRepository)
    const validCreateCardsRequest: CardsData = CardsBuilder.aCards().build()
    const response: CardsData = (await usecase.perform(validCreateCardsRequest)).value as CardsData
    const validRegisteredUser: UserData = UserBuilder.aUser().build()
    const addedCardss: CardsData[] = await emptyCardsRepository.findAllCardssFrom(validRegisteredUser.id)
    expect(addedCardss.length).toEqual(1)
    expect((addedCardss[0]).title).toEqual(validCreateCardsRequest.title)
    expect(response.id).not.toBeUndefined()
  })

  test('should not create cards with unregistered owner', async () => {
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const usecase = new CreateCards(emptyCardsRepository)
    const createCardsRequestWithUnregisteredOwner: CardsData =
      CardsBuilder
        .aCards()
        .withUnregisteredOwner()
        .build()
    const response: Error = (await usecase.perform(createCardsRequestWithUnregisteredOwner)).value as Error
    expect(response.name).toEqual('UnregisteredOwnerError')
  })

  test('should not create cards with invalid title', async () => {
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const usecase = new CreateCards(emptyCardsRepository)
    const createCardsRequestWithInvalidTitle: CardsData =
      CardsBuilder
        .aCards()
        .withInvalidTitle()
        .build()
    const response: Error = (await usecase.perform(createCardsRequestWithInvalidTitle)).value as Error
    expect(response.name).toEqual('InvalidTitleError')
  })

  test('should not create cards with existing title', async () => {
    const emptyCardsRepository = new InMemoryCardsRepository([])
    const usecase = new CreateCards(emptyCardsRepository)
    const validCreateCardsRequest: CardsData = CardsBuilder.aCards().build()
    await usecase.perform(validCreateCardsRequest)
    const error: Error = (await usecase.perform(validCreateCardsRequest)).value as Error
    expect(error.name).toEqual('ExistingTitleError')
  })
})
