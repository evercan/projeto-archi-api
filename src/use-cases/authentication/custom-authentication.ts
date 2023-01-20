import { AuthenticationParams, AuthenticationResult, AuthenticationService } from '@/use-cases/authentication/ports'
import { Encoder, CardsRepository } from '@/use-cases/ports'
import { TokenManager } from '@/use-cases/authentication/ports/token-manager'
import { Either, left, right } from '@/shared'
import { CardsNotFoundError, WrongPasswordError } from './errors'

export class CustomAuthentication implements AuthenticationService {
  private readonly cardsRepository: CardsRepository
  private readonly encoder: Encoder
  private readonly tokenManager: TokenManager

  constructor
  (cardsRepository: CardsRepository, encoder: Encoder, tokenManager: TokenManager) {
    this.cardsRepository = cardsRepository
    this.encoder = encoder
    this.tokenManager = tokenManager
  }

  async auth (authenticationParams: AuthenticationParams):
    Promise<Either<CardsNotFoundError | WrongPasswordError, AuthenticationResult>> {
    const user = await this.cardsRepository.findByEmail(authenticationParams.email)
    if (!user) {
      return left(new CardsNotFoundError())
    }

    const matches =
      await this.encoder.compare(authenticationParams.login, user.password)
    if (!matches) {
      return left(new WrongPasswordError())
    }

    const accessToken = await this.tokenManager.sign({ id: user.id })

    return right({
      accessToken: accessToken,
      id: user.id
    })
  }
}
