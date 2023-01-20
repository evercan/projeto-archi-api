import { Router } from 'express'
import { makeLoginController } from '@/main/factories'
import { adaptRoute } from '../adapters/route-adapter'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
