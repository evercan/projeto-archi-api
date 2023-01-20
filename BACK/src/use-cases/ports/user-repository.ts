import { UserData } from './user-data'

export interface UserRepository {
  findAll () : Promise<UserData[]>
  findByLogin (login: string) : Promise<UserData>
  add (userData: UserData): Promise<UserData>
}
