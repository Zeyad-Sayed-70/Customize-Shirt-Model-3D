import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

const router = express.Router()

router.route('/').post((req, res) => {
  try {
    const { prompt } = req.body

    if ( !prompt ) return res.status(400).json({ message: 'something went wrong!' })

    const result = openai.createImage({
      prompt,
      size: '1024x1024',
      n: 1,
      response_format: 'b64_json'
    })

    const image = result.data.data[0].b64_json

    if ( image === null ) return res.status(400).json({ message: 'something went wrong!' })

    res.status(200).json({ message: 'Successfully generated iamge', image })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'something went wrong!' })
  }
})

export default router