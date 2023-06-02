const Patient = require('../models/patientModel')
const APIFeatures = require('./../utils/APIFeatures')

exports.getAllPatients = async (req, res) => {
    try {
        //---execute query---
        const features = new APIFeatures(Patient.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        const patients = await features.query
        res.status(200).json({
            status: 'success',
            data: {
                count: patients.length,
                patients
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: {
                message: 'fail',
                details: error
            }
        })
    }

}
exports.addNewPatient = async (req, res) => {
    try {
        const newPatient = await Patient.create(req.body)
        res.status(400).json({
            status: 'success',
            data: {
                patient: newPatient
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: {
                message: 'fail',
                details: error
            }
        })
    }
}

