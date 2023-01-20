
import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper/mongo-helper'
require('dotenv').config()
import app from './config/app'

const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log('Server running at ' + port)
    })

// MongoHelper.connect(process.env.MONGO_URL)
//   .then(async () => {
//     const app = (await import('./config/app')).default
//     app.listen(process.env.PORT || 5000, () => {
//       console.log('Server running...')
//     })
//   })
//   .catch(console.error)