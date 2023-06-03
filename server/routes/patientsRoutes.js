const express = require('express')
const patientsController = require('../controllers/patientsController')


const router = express.Router()

router.route('/')
    .get(patientsController.getAllPatients)
    .post(patientsController.addNewPatient)


router.route('/:id')
    .get(patientsController.getPatient)
    .delete(patientsController.deletePatient)
    .patch(patientsController.updatePatient)

router.route('/:id/appointments')
    .get(patientsController.getAllAppointments)
module.exports = router