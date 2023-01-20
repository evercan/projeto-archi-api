import { CardsData, CardsRepository, UserRepository } from '@/use-cases/ports'
import { UpdateCardsRequest, UpdateCards } from '@/use-cases/update-cards'
import { InMemoryCardsRepository, InMemoryUserRepository } from '@test/doubles/repositories'
import { UserBuilder, CardsBuilder } from '@test/builders'
import { ExistingTitleError } from '@/use-cases/create-cards/errors'
import { InvalidTitleError } from '@/entities/errors'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'

describe('Update cards use case', () => {
  test('should update title and content of existing cards', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const cardsWithDifferentTitleAndContent: CardsData = CardsBuilder.aCards().withDifferentTitleAndContent().build()
    const changedCards: UpdateCardsRequest = {
      titulo: cardsWithDifferentTitleAndContent.title,
      conteudo: cardsWithDifferentTitleAndContent.content,
      id: originalCards.id,
      lista: originalCards.lista
    }
    const owner = UserBuilder.aUser().build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])
    const userRepositoryWithAUser: UserRepository = new InMemoryUserRepository([
      owner
    ])
    const usecase = new UpdateCards(cardsRepositoryWithACards, userRepositoryWithAUser)
    const response = (await usecase.perform(changedCards)).value as CardsData
    expect(response.title).toEqual(changedCards.title)
    expect(response.content).toEqual(changedCards.content)
  })

  test('should not update title of existing cards if user already has cards with same title', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const aSecondCards: CardsData = CardsBuilder.aCards().withDifferentTitleAndContent().build()
    const changedCards: UpdateCardsRequest = {
      titulo: aSecondCards.titulo,
      conteudo: originalCards.conteudo,
      lista: originalCards.lista,
      id: originalCards.id
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards, aSecondCards])

    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const response = (await usecase.perform(changedCards)).value as Error
    expect(response).toBeInstanceOf(ExistingTitleError)
  })

  test('should update title of existing cards', async () => {
    const originalCards: CardsData = CardsBuilder.aCards().build()
    const changedCards = {
      title: 'A different title',
      conteudo: originalCards.conteudo,
      id: originalCards.id,
      lista: originalCards.lista
    }
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([originalCards])    
    const usecase = new UpdateCards(cardsRepositoryWithACards)
    const response = (await usecase.perform(changedCards)).value as CardsData
    expect(response.title).toEqual(changedCards.title)
  })

})
