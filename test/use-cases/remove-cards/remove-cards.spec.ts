import { CardsRepository } from '@/use-cases/ports'
import { RemoveCards } from '@/use-cases/remove-cards'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'
import { CardsBuilder } from '@test/builders'
import { InMemoryCardsRepository } from '@test/doubles/repositories'

describe('Remove cards use case', () => {
  test('should remove existing cards', async () => {
    const aCards =
    CardsBuilder
      .aCards()
      .build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([aCards])
    const usecase = new RemoveCards(cardsRepositoryWithACards)
    await usecase.perform(aCards.id)
    expect(await cardsRepositoryWithACards.findById(aCards.id)).toBeNull()
  })

  test('should return error if removing unexisting cards', async () => {
    const aCards =
    CardsBuilder
      .aCards()
      .build()
    const anotherCards =
      CardsBuilder
        .aCards()
        .withDifferentTitleAndId()
        .build()
    const cardsRepositoryWithACards: CardsRepository = new InMemoryCardsRepository([aCards])
    const usecase = new RemoveCards(cardsRepositoryWithACards)
    const error = (await usecase.perform(anotherCards.id)).value as Error
    expect(error).toBeInstanceOf(UnexistingCardsError)
  })
})
