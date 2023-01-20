import { Cards } from '@/entities/cards'

describe('Cards entity', () => {
  test('should be created with a valid title', () => {
    const validTitle = 'my cards'
    const validConteudo = 'conteudo'
    const validLista = 'lista'
    const nullContent = null
    const cards: Cards = Cards.create(validTitle, nullContent,validLista).value as Cards
    expect(cards.title.value).toEqual('my cards')
    expect(cards.conteudo.value).toEqual('conteudo')
    expect(cards.lista.value).toEqual('lista')
  })

  test('should not be created with invalid title', () => {
    const invalidTitle = ''
    const validConteudo = 'conteudo'
    const validLista = 'lista'
    const undefinedContent = undefined
    const error: Error = Cards.create(invalidTitle, validConteudo, validLista).value as Error
    expect(error.name).toEqual('InvalidTitleError')
  
  })

  test('should be created with empty content if content is null', () => {
    const validTitle = 'my cards'
    const validConteudo = 'conteudo'
    const validLista = 'lista'
    const nullContent = null
    const cards: Cards = Cards.create(validTitle, nullContent,validLista).value as Cards
    expect(cards.title.value).toEqual('my cards')
    expect(cards.conteudo.value).toEqual('')
    expect(cards.lista.value).toEqual('lista')
 
  })

  test('should be created with empty content if content is undefined', () => {
    const validTitle = 'my cards'
    const validConteudo = 'conteudo'
    const validLista = 'lista'
    const undefinedContent = undefined
    const cards: Cards = Cards.create(validTitle, validConteudo,validLista).value as Cards
    expect(cards.title.value).toEqual('my cards')
    expect(cards.conteudo.value).toEqual('conteudo')
    expect(cards.lista.value).toEqual('lista')
  })
})
