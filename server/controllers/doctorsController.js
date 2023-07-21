const Doctor = require('../models/doctorModel')
const APIFeatures = require('./../utils/APIFeatures')
const Appointment = require('../models/appointmentModel')

exports.getAllDoctors = async (req, res) => {
    try {

        const featuresForCount = new APIFeatures(Doctor.find(), req.query)
            .filter()
            .sort()
            .limitFields();
        const searchCount = await featuresForCount.query.countDocuments();



        const features = new APIFeatures(Doctor.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()



        const doctors = await features.query
        const fullCount = await Doctor.countDocuments()
        //---send response---
        res.status(200).json({
            status: 'success',
            data: {
                count: doctors.length,
                searchCount,
                fullCount,
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
        res.status(200).json({
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

exports.getDoctor = async (req, res) => {
    try {

        let doctor = await Doctor.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'No such doctor'
        })
    }
}
exports.deleteDoctor = async (req, res) => {
    try {
        let appCount = 0
        let appointments = await Appointment.find({ doctor: req.params.id })
        const appointmentIds = appointments.map(appointment => appointment._id)
        appointments = []
        appointmentIds.forEach(a => {
            appointments.push(a.toString())
        })
        appointments.forEach(async a => {
            await Appointment.findByIdAndDelete(a)
            appCount++
        })

        const deleted = await Doctor.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            appointmentsDeleted: appCount,
            data: {
                doctor: deleted
            }
        })
    } catch (error) {
        res.status(400).json({
            satus: "fail",
            message: error
        })
    }
}
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        })
    } catch (error) {
        res.status(400).json({
            satus: "fail",
            message: error
        })
    }
}

exports.getAllAppointments = async (req, res) => {
    try {
        const doctorID = req.params.id
        let appointments = await Appointment.find({ doctor: doctorID })
        const appointmentsIds = appointments.map(appointment => appointment._id)
        appointments = []
        appointmentsIds.forEach(a => {
            appointments.push(a.toString())
        })
        console.log(appointments)

        res.status(200).json({
            status: 'success',
            data: {
                appointments
            }
        })

    } catch (error) {

        res.status(400).json({
            satus: "fail",
            message: 'no appointments'
        })

    }
}