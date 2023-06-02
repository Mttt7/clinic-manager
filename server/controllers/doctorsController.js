const Doctor = require('../models/doctorModel')
const APIFeatures = require('./../utils/APIFeatures')

exports.getAllDoctors = async (req, res) => {
    try {
        const features = new APIFeatures(Doctor.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        const doctors = await features.query
        //---send response---
        res.status(200).json({
            status: 'success',
            data: {
                count: doctors.length,
                doctors
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

exports.addNewDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body)
        res.status(400).json({
            status: 'success',
            data: {
                doctor: newDoctor
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