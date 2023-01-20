import { HttpRequest, HttpResponse, ControllerOperation } from '@/presentation/controllers/ports'
import { Either } from '@/shared'
import { UseCase } from '@/use-cases/ports'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'
import { badRequest, ok } from '@/presentation/controllers/util'

export class RemoveCardsOperation implements ControllerOperation {
  readonly requiredParams = ['cardsId']
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  async specificOp (request: HttpRequest): Promise<HttpResponse> {
    const useCaseResponse: Either<UnexistingCardsError, void> =
      await this.useCase.perform(request.body.cardsId)

    if (useCaseResponse.isRight()) {
      return ok(useCaseResponse.value)
    }

    return badRequest(useCaseResponse.value)
  }
}
