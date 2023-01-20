import { MongoHelper } from '@/external/repositories/mongodb/helpers'
import { CardsBuilder } from '@test/builders'
import { makeCardsRepository, makeEncoder, makeTokenManager } from '@/main/factories'
import app from '@/main/config/app'
import request from 'supertest'

describe('Load cards route', () => {
  let aCards = CardsBuilder.aCards().build()
  let aSecondCards = CardsBuilder.aCards().withDifferentTitleAndId().build()
  let token = null

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await MongoHelper.clearCollection('cards')
    const cardsRepo = makeCardsRepository()
    const encoder = makeEncoder()
    const tokenManager = makeTokenManager()
   
    aCards = await cardsRepo.add({
      titulo: aCards.titulo,
      conteudo: aCards.conteudo,
      lista: aCards.lista
    })
    aSecondCards = await cardsRepo.add({
      titulo: aCards.titulo,
      conteudo: aCards.conteudo,
      lista: aCards.lista
    })
  })

  afterAll(async () => {
    await MongoHelper.clearCollection('cards')
    await MongoHelper.disconnect()
  })

  test('should be able to load cards', async () => {
    await request(app)
      .get('/cards/')
      .set('x-access-token', token)     
      .expect(200)
      .then((res) => {
        expect((res.body as []).length).toEqual(2)
      })
  })
})
