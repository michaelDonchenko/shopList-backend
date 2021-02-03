const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./database/connectDB')
dotenv.config()

app.use(cors())

//Init middleware
app.use(express.json({ limit: '5mb' }))

app.use('/api/room', require('./routes/room'))

//Databae connection
connectDB()

//Port listener
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})
