import { InvalidLoginError, InvalidSenhaError } from '@/entities/errors'
import { UserData, UserRepository, Encoder, UseCase } from '@/use-cases/ports'
import { User } from '@/entities'
import { Either, left, right } from '@/shared'
import { ExistingUserError } from '@/use-cases/login/errors'
import { AuthenticationResult, AuthenticationService } from '@/use-cases/authentication/ports'

export class Login implements UseCase {
  private readonly userRepository: UserRepository
  private readonly encoder: Encoder
  private readonly authentication: AuthenticationService

  constructor (userRepository: UserRepository, encoder: Encoder, authentication: AuthenticationService) {
    this.userRepository = userRepository
    this.encoder = encoder
    this.authentication = authentication
  }

  public async perform (userSignupRequest: UserData):
    Promise<Either< InvalidSenhaError, AuthenticationResult>> {
    const userOrError = User.create(userSignupRequest.login, userSignupRequest.senha)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    // const user = await this.userRepository.findByLogin(userSignupRequest.login)
    // if (user) {
    //   return left(new ExistingUserError(userSignupRequest))
    // }
    
    await this.userRepository.add({
      login: userSignupRequest.login,
      senha: userSignupRequest.senha
    })

    const response =
      (await this.authentication.auth({
        login: userSignupRequest.login,
        senha: userSignupRequest.senha
      })).value as AuthenticationResult

    return right(response)
  }
}
