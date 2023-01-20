
import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper/mongo-helper'
require('dotenv').config()
import app from './config/app'

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {   
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running...')
    })
  })
  .catch(console.error)