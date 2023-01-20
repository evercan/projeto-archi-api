import { Router } from 'express'
import { makecreateCardsController } from '@/main/factories'
import { adaptRoute } from '../adapters/route-adapter'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makecreateCardsController()))
}
