import { Either, left, right } from '@/shared'
import { CardsRepository, UseCase } from '@/use-cases/ports'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'

export class RemoveCards implements UseCase {
  private readonly cardsRepository: CardsRepository

  constructor (cardsRepository: CardsRepository) {
    this.cardsRepository = cardsRepository
  }

  async perform (cardsId: number): Promise<Either<UnexistingCardsError, boolean>> {
    if (await this.cardsRepository.findById(cardsId)) {
      return right(await this.cardsRepository.remove(cardsId))
    }
    return left(new UnexistingCardsError())
  }
}
