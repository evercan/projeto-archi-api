import { HttpResponse, HttpRequest, ControllerOperation } from '@/presentation/controllers/ports'
import { badRequest, created, forbidden } from '@/presentation/controllers/util'
import { ExistingUserError } from '@/use-cases/login/errors'
import { UseCase } from '@/use-cases/ports'

export class LoginOperation implements ControllerOperation {
  readonly requiredParams = ['login', 'senha']
  private useCase: UseCase

  constructor (useCase: UseCase) {
    console.log('veio login login');
    this.useCase = useCase
  }

  async specificOp (request: HttpRequest): Promise<HttpResponse> {
    const response =
      await this.useCase.perform({
        login: request.body.login,
        senha: request.body.senha
      })
   
    if (response.isRight()) {
      return created(response.value)
    }

    if (response.value instanceof ExistingUserError) {
      return forbidden(response.value)
    }
    return badRequest(response.value)
  }
}
