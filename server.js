const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())

//init middleware
app.use(express.json({ limit: '5mb' }))

//port listener
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})
