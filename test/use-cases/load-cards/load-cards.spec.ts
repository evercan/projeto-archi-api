import { CardsData, CardsRepository } from '@/use-cases/ports'
import { LoadCards } from '@/use-cases/load-cards'
import { InMemoryCardsRepository } from '@test/doubles/repositories'
import { CardsBuilder } from '@test/builders'

describe('Load cardss for user use case', () => {
  test('should correctly load cardss for a registered user', async () => {
    const cards2: CardsData = CardsBuilder.aCards().withDifferentTitleAndId().build()
    const cardsRepositoryWithTwoCardss: CardsRepository = new InMemoryCardsRepository(
      [cards2]
    )
    const usecase: LoadCards = new LoadCards(cardsRepositoryWithTwoCardss)
    const cards: CardsData[] = await usecase.perform(1)
    expect(cards.length).toEqual(1)
    expect(cards[1].titulo).toEqual(cards2.titulo)
  })

  test('should fail to load cardss for user without cardss', async () => {
    const cards2: CardsData = CardsBuilder.aCards().withDifferentTitleAndId().build()
    const cardsRepositoryWithTwoCardss: CardsRepository = new InMemoryCardsRepository(
      [cards2]
    )
    const usecase: LoadCards = new LoadCards(cardsRepositoryWithTwoCardss)
    const cards: CardsData[] = await usecase.perform(1)
    expect(cards.length).toEqual(0)
  })
})
