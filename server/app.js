const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const patientsRouter = require('./routes/patientsRoutes')
const doctorsRouter = require('./routes/doctorsRoutes')
const appointmentsRouter = require('./routes/appointmentsRoutes')





//1)MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(cors())



//2)ROUTES
app.use('/api/v1/patients', patientsRouter)
app.use('/api/v1/doctors', doctorsRouter)
app.use('/api/v1/appointments', appointmentsRouter)

module.exports = app