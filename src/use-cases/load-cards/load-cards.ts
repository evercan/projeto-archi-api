import { CardsData, CardsRepository, UseCase } from '@/use-cases/ports'

export class LoadCards implements UseCase {
  private readonly cardsRepository: CardsRepository

  constructor (cardsRepository: CardsRepository) {
    this.cardsRepository = cardsRepository
  }

  public async perform (requestCardsId: number): Promise<CardsData> {
    return await this.cardsRepository.findById(requestCardsId)
  }
}
