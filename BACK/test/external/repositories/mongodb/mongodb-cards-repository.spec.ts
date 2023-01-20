import { MongoHelper } from '@/external/repositories/mongodb/helpers'
import { MongodbCardsRepository } from '@/external/repositories/mongodb/mongodb-cards-repository'
import { CardsData } from '@/use-cases/ports'
import { CardsBuilder } from '@test/builders'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('cardss')
  })

  test('should add valid cards', async () => {
    const repository = new MongodbCardsRepository()
    const aValidCards = CardsBuilder.aCards().build()
    const addedCards: CardsData = await repository.add(aValidCards)
    const foundCards = await repository.findById(addedCards.id)
    expect(foundCards).toBeDefined()
  })


  test('should remove existing cards', async () => {
    const repository = new MongodbCardsRepository()
    const aValidCards = CardsBuilder.aCards().build()
    const addedCards: CardsData = await repository.add(aValidCards)
    const foundCards = await repository.findById(addedCards.id)
    expect(foundCards).toBeDefined()
    await repository.remove(foundCards.id)
    const removedCards = await repository.findById(addedCards.id)
    expect(removedCards).toBeNull()
  })

  test('should update title of existing cards', async () => {
    const repository = new MongodbCardsRepository()
    const aValidCards = CardsBuilder.aCards().build()
    const addedCards: CardsData = await repository.add(aValidCards)
    await repository.updateTitle(addedCards.id, 'New title')
    const updatedCards = await repository.findById(addedCards.id)
    expect(updatedCards.title).toEqual('New title')
  })

  test('should update content of existing cards', async () => {
    const repository = new MongodbCardsRepository()
    const aValidCards = CardsBuilder.aCards().build()
    const addedCards: CardsData = await repository.add(aValidCards)
    await repository.updateContent(addedCards.id, 'New content')
    const updatedCards = await repository.findById(addedCards.id)
    expect(updatedCards.content).toEqual('New content')
  })
})
