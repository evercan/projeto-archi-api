import { Router } from 'express'
import { makecreateCardsController, makeRemoveCardsController, makeUpdateCardsController, makeLoadCardsController } from '@/main/factories'
import { adaptRoute } from '../adapters/route-adapter'
import { authentication } from '@/main/middleware/'

export default (router: Router): void => {
  router.post('/cards', authentication, adaptRoute(makecreateCardsController()))
  router.delete('/cards/:cardId', authentication, adaptRoute(makeRemoveCardsController()))
  router.put('/cards/:cardId', authentication, adaptRoute(makeUpdateCardsController()))
  router.get('/cards', authentication, adaptRoute(makeLoadCardsController()))
}
