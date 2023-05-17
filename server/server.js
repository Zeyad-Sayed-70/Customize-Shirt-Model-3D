import express from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'

import dalleRouter from './routes/dalle.routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limig: '50mb' }))

app.use('/api/v1/dalle', dalleRouter)

app.get('/', (req, res) => {
  res.json({ message: "hello server" })
})

app.listen(8080, () => console.log(`Server is Running is ${8080}`))