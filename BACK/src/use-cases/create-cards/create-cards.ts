import { Cards } from '@/entities'
import { CardsData,CardsRepository } from '@/use-cases/ports'
import { UseCase } from '@/use-cases/ports'

export class CreateCards implements UseCase {
  private readonly cardsRepo: CardsRepository

  constructor (cardsRepo: CardsRepository) {
    this.cardsRepo = cardsRepo
  }

  public async perform (request: Cards): Promise<CardsData> {
    const titulo = request.titulo.value
    const conteudo = request.conteudo
    const lista = request.lista
    const cardsData = { titulo, conteudo, lista }
      await this.cardsRepo.add(cardsData)
    return cardsData
  }
}
