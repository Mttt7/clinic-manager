const express = require('express')
const appointmentsController = require('../controllers/appointmentsController')


const router = express.Router()

router.route('/')
    .get(appointmentsController.getAllAppointments)



module.exports = router