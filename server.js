import express from 'express'
import routes from './routes.js'
import './db.js'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use('/api', routes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})