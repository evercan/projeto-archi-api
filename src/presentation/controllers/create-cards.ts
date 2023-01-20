import { InvalidConteudoError, InvalidListaError, InvalidTituloError } from '@/entities/errors'
import { HttpRequest, HttpResponse, ControllerOperation } from '@/presentation/controllers/ports'
import { Either } from '@/shared'
import { ExistingTituloError, UnregisteredConteudoError, UnregisteredListaError } from '@/use-cases/create-cards/errors'
import { CardsData, UseCase } from '@/use-cases/ports'
import { created, badRequest } from '@/presentation/controllers/util'

export class CreateCardsOperation implements ControllerOperation {
  private useCase: UseCase
  readonly requiredParams = ['titulo', 'conteudo', 'lista']

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  async specificOp (request: HttpRequest): Promise<HttpResponse> {
    const cardsRequest: CardsData = {
      titulo: request.body.titulo,
      conteudo: request.body.conteudo,
      lista: request.body.lista
    }
    const useCaseResponse: Either<InvalidConteudoError | InvalidListaError | InvalidTituloError| ExistingTituloError | UnregisteredConteudoError| UnregisteredListaError, CardsData> =
      await this.useCase.perform(cardsRequest)

    if (useCaseResponse.isRight()) {
      return created(useCaseResponse.value)
    }

    return badRequest(useCaseResponse.value)
  }
}
