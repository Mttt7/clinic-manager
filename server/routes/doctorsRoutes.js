const express = require('express')
const doctorsController = require('../controllers/doctorsController')


const router = express.Router()

router.route('/')
    .get(doctorsController.getAllDoctors)



module.exports = router