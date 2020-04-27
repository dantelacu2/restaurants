const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const db = require('./db')
const restaurantRouter = require('./routes/restaurant-router')
const adminRouter = require('./routes/admin-router')

const app = express()
const apiPort = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, "../client/build")));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', restaurantRouter)
app.use('/admin', adminRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
