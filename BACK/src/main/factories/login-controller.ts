import { Login } from '@/use-cases/login'
import { LoginOperation, WebController } from '@/presentation/controllers'
import { CustomAuthentication } from '@/use-cases/authentication'
import { makeTokenManager, makeEncoder } from '@/main/factories'
import { makeUserRepository } from './user-repository'

export const makeLoginController = (): WebController => {
  const userRepository = makeUserRepository()
  const encoder = makeEncoder()
  const tokenManager = makeTokenManager()
  const authenticationService = new CustomAuthentication(userRepository, encoder, tokenManager)
  const usecase = new Login(userRepository, encoder, authenticationService)
  const controller = new WebController(new LoginOperation(usecase))
  return controller
}
