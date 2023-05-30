const express = require('express')
const app = express()
const morgan = require('morgan')
const patientsRouter = require('./routes/patientsRoutes')

const patientController = require('./controllers/patientController')



//1)MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())



//2)ROUTES
app.use('/api/v1/', patientsRouter)

module.exports = app