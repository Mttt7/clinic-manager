const express = require('express')
const patientController = require('./../controllers/patientController')


const router = express.Router()

router.route('/')
    .get(patientController.getAllPatients)

module.exports = router