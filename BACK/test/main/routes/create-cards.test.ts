import { MongoHelper } from '@/external/repositories/mongodb/helpers'
import { CardsBuilder } from '@test/builders'
import { makeUserRepository, makeEncoder, makeTokenManager } from '@/main/factories'
import app from '@/main/config/app'
import request from 'supertest'

describe('Create cards route', () => {
  const aCards = CardsBuilder.aCards().build()
  let token = null

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await MongoHelper.clearCollection('cards')
    const userRepo = makeUserRepository()
    const encoder = makeEncoder()
    const tokenManager = makeTokenManager()   
  })

  afterAll(async () => {
    await MongoHelper.clearCollection('cards')
    await MongoHelper.disconnect()
  })

  test('should be able to create cards', async () => {
    await request(app)
      .post('/cards')
      .set('x-access-token', token)
      .send({
        titulo: aCards.titulo,
        conteudo: aCards.conteudo,
        lista: aCards.lista
      })
      .expect(201)
  })
})
