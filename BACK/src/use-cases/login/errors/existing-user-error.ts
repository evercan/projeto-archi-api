import { UserData } from '../../ports/user-data'

export class ExistingUserError extends Error {
  public readonly name = 'Usuário existente'
  constructor (userData: UserData) {
    super('User ' + userData.login + ' already registered.')
  }
}
