import { CardsData, CardsRepository } from '@/use-cases/ports'
import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid';

export type MongodbCards = {
  titulo: string,
  conteudo: string,
  lista: string,
  id: string
}

export class MongodbCardsRepository implements CardsRepository {
  async add (cards: CardsData): Promise<CardsData> {
    const cardsCollection = await MongoHelper.getCollection('cards')
    const cardsClone: MongodbCards = {
      titulo: cards.titulo,
      conteudo: cards.conteudo,
      lista: cards.lista,
      id: uuidv4()
    }
    await cardsCollection.insertOne(cardsClone)
    return this.withApplicationId(cardsClone)
  }

  async update (cards: CardsData): Promise<void> {
    const cardsCollection = MongoHelper.getCollection('cards')
    const exists = await this.exists(cards)
    if (!exists) {
      const cardsClone: CardsData = {
        titulo: cards.titulo,
        conteudo: cards.conteudo,
        lista: cards.lista
      }
      await (await cardsCollection).updateOne({cards},cardsClone )
    }
  }

  async remove (id: number): Promise<boolean> {
    const cardsCollection = MongoHelper.getCollection('cards')
    const result = (await cardsCollection).deleteOne({ id: id })
    if (result != null) {
      return true
    }
    return false
  }

  async findById (id: number): Promise<CardsData> {
    const cardsCollection = MongoHelper.getCollection('cards')
    const result = (await cardsCollection).findOne<CardsData>({ id: id })
    return result
  }

  async findAllCards (): Promise<CardsData[]> {
    const cardsCollection = MongoHelper.getCollection('cards')
    return (await cardsCollection).find<CardsData>({}).toArray()
  }

  async exists (cards: CardsData): Promise<boolean> {
    const cardsCollection = MongoHelper.getCollection('cards')
    const exists = await this.exists(cards)
    if (!exists) {
      return true
    }
    return false
  }

  async updateTitle (cardsId: number, newTitle: string): Promise<void> {
    const cardsCollection = await MongoHelper.getCollection('cards')
    await cardsCollection.updateOne({ _id: new ObjectId(cardsId) }, {
      $set: {
        title: newTitle
      }
    })
  }

  async updateContent (cardsId: number, newContent: string): Promise<void> {
    const cardsCollection = await MongoHelper.getCollection('cards')
    await cardsCollection.updateOne({ id: new ObjectId(cardsId) }, {
      $set: {
        content: newContent
      }
    })
  }

  async updateList (cardsId: number, newContent: string): Promise<void> {
    const cardsCollection = await MongoHelper.getCollection('cards')
    await cardsCollection.updateOne({ id: new ObjectId(cardsId) }, {
      $set: {
        content: newContent
      }
    })
  }

  private withApplicationId (dbCards: MongodbCards): CardsData {
    return {
      titulo: dbCards.titulo,
      conteudo: dbCards.conteudo,
      lista: dbCards.lista,
      id: dbCards.id
    }
  }
}
