import { UserData, UserRepository } from '@/use-cases/ports'
import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { v4 as uuidv4 } from 'uuid';

export type MongodbUser = {
  login: string,
  senha: string,
  id: string
}

export class MongodbUserRepository implements UserRepository {
  async findAll (): Promise<UserData[]> {
    const userCollection = await MongoHelper.getCollection('users')
    return (await userCollection.find<MongodbUser>({}).toArray()).map(this.withApplicationId)
  }

  async findByLogin (login: string): Promise<UserData> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne<MongodbUser>({ login: login })
    if (user) {
      return this.withApplicationId(user)
    }
    return null
  }

  async add (user: UserData): Promise<UserData> {
    const userCollection = await MongoHelper.getCollection('users')
    const userClone = {
      login: user.login,
      senha: user.senha,
      id: uuidv4()
    }
    await userCollection.insertOne(userClone)
    return this.withApplicationId(userClone)
  }

  private withApplicationId (dbUser: MongodbUser): UserData {
    return {
      login: dbUser.login,
      senha: dbUser.senha,
      id: dbUser.id
    }
  }
}
