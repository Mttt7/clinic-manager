const express = require('express')
const appointmentsController = require('../controllers/appointmentsController')


const router = express.Router()

router.route('/')
    .get(appointmentsController.getAllAppointments)
    .post(appointmentsController.addNewAppointment)

router.route('/:id')
    .get(appointmentsController.getAppointment)
    .delete(appointmentsController.deleteAppointment)
    .patch(appointmentsController.updateAppointment)


module.exports = router