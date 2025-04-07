
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' with { type: "json"}

import routes from './routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('src/public'))
app.use(routes)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(process.env.PORT,()=>{
    console.log('====================================');
    console.log("Servidor rodando na porta: "+ process.env.PORT);
    console.log('====================================');
})