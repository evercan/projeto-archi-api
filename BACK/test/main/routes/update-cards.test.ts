import { MongoHelper } from '@/external/repositories/mongodb/helpers'
import { CardsBuilder } from '@test/builders'
import { makeCardsRepository, makeEncoder, makeTokenManager } from '@/main/factories'
import app from '@/main/config/app'
import request from 'supertest'

describe('Update cards route', () => {
  let aCards = CardsBuilder.aCards().build()
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
  })

  afterAll(async () => {
    await MongoHelper.clearCollection('cards')
    await MongoHelper.disconnect()
  })

  test('should be able to update title of existing cards', async () => {
    const newTitle = 'a new title'
    await request(app)
      .put('/cards/' + aCards.id)
      .set('x-access-token', token)
      .send({
        id: aCards.id,
        titulo: newTitle,
        conteudo: aCards.conteudo,
        lista: aCards.lista
      })
      .expect(200)
      .then((res) => {
        expect(res.body.title).toEqual(newTitle)
      })
  })

  test('should be able to update content of existing cards', async () => {
    const newContent = 'new content'
    await request(app)
      .put('/cards/' + aCards.id)
      .set('x-access-token', token)
      .send({
        id: aCards.id,
        conteudo: newContent,
        titulo: aCards.titulo,
        lista: aCards.lista
      })
      .expect(200)
      .then((res) => {
        expect(res.body.content).toEqual(newContent)
      })
  })
})
