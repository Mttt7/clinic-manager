const express = require('express')
const doctorsController = require('../controllers/doctorsController')


const router = express.Router()

router.route('/')
    .get(doctorsController.getAllDoctors)
    .post(doctorsController.addNewDoctor)

router.route('/:id')
    .get(doctorsController.getDoctor)
    .delete(doctorsController.deleteDoctor)
    .patch(doctorsController.updateDoctor)

router.route('/:id/appointments')
    .get(doctorsController.getAllAppointments)

module.exports = router