import { InvalidTituloError } from '@/entities/errors'
import { Cards } from '@/entities'
import { Either, left, right } from '@/shared'
import { ExistingTituloError } from '@/use-cases/create-cards/errors'
import { UseCase, CardsData, CardsRepository } from '@/use-cases/ports'
import { UnexistingCardsError } from '@/use-cases/remove-cards/errors'

export type UpdateCardsRequest = {
  titulo?: string,
  conteudo?: string,
  lista: string,
  id: number
}

export class UpdateCards implements UseCase {
  private readonly cardsRepository: CardsRepository

  constructor (cardsRepository: CardsRepository) {
    this.cardsRepository = cardsRepository
  }

  public async perform (changedCardsData: UpdateCardsRequest):
    Promise<Either<UnexistingCardsError | InvalidTituloError | ExistingTituloError, CardsData>> {
    
    const original = await this.cardsRepository.findById(changedCardsData.id)
    if (!original) {
      return left(new UnexistingCardsError())
    }

   
    const cardsOrError = Cards.create(getTitleToBeUsed(changedCardsData, original),
    getContentToBeUsed(changedCardsData, original),getListToBeUsed(changedCardsData,original))
    if (cardsOrError.isLeft()) {
      return left(cardsOrError.value)
    }

    const changedCards = cardsOrError.value as Cards

    if (shouldChangeTitle(changedCardsData)) {     
      await this.cardsRepository.updateTitle(changedCardsData.id, changedCards.titulo.value)
    }

    if (shouldChangeContent(changedCardsData)) {
      await this.cardsRepository.updateContent(changedCardsData.id, changedCards.conteudo)
    }

    if (shouldChangeList(changedCardsData)) {
      await this.cardsRepository.updateList(changedCardsData.id, changedCards.lista)
    }

    return right(await this.cardsRepository.findById(changedCardsData.id))
  }
  
}

function shouldChangeTitle (updateCardsRequest: UpdateCardsRequest) {
  return Object.keys(updateCardsRequest).indexOf('titulo') !== -1
}

function shouldChangeContent (updateCardsRequest: UpdateCardsRequest) {
  return Object.keys(updateCardsRequest).indexOf('conteudo') !== -1
}

function shouldChangeList (updateCardsRequest: UpdateCardsRequest) {
  return Object.keys(updateCardsRequest).indexOf('lista') !== -1
}

function getTitleToBeUsed (changedCardsData: UpdateCardsRequest, original: CardsData): string {
  return shouldChangeTitle(changedCardsData) ? changedCardsData.titulo : original.titulo
}

function getContentToBeUsed (changedCardsData: UpdateCardsRequest, original: CardsData): string {
  return shouldChangeContent(changedCardsData) ? changedCardsData.conteudo : original.conteudo
}

function getListToBeUsed (changedCardsData: UpdateCardsRequest, original: CardsData): string {
  return shouldChangeList(changedCardsData) ? changedCardsData.lista : original.lista
}