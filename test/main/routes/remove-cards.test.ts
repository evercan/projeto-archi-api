import { MongoHelper } from '@/external/repositories/mongodb/helpers'
import { CardsBuilder } from '@test/builders'
import { makeCardsRepository, makeEncoder, makeTokenManager } from '@/main/factories'
import app from '@/main/config/app'
import request from 'supertest'

describe('Remove cards route', () => {
  let aCards = CardsBuilder.aCards().build()
  let token = null

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await MongoHelper.clearCollection('cards')
    const cardsRepo = makeNoteRepository()
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

  test('should be able to remove existing cards ', async () => {
    await request(app)
      .delete('/cards/' + aCards.id)
      .set('x-access-token', token)      
      .expect(200)
  })

  test('should not be able to remove existing cards', async () => {
    await request(app)
      .delete('/cards/' + aCards.id)
      .set('x-access-token', token)
      .send({
        noteId: aCards.id,
        userId: 'a different id'
      })
      .expect(403)
  })
})
