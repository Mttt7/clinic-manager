const express = require('express')
const patientsController = require('../controllers/patientsController')


const router = express.Router()

router.route('/')
    .get(patientsController.getAllPatients)
    .post(patientsController.addNewPatient)



module.exports = router