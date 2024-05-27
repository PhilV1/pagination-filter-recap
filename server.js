import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js'
dotenv.config()

const app = express()

app.use(express.json())

const port = process.env.PORT || 5060

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    console.log('Verbindung mit MongoDB hat geklappt')
    app.listen(port, () => {
      console.log('Server läuft auf:', port)
    })
  } catch (error) {
    console.log(error)
  }
}
startServer()
