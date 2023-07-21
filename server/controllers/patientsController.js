const Appointment = require('../models/appointmentModel')
const Patient = require('../models/patientModel')
const APIFeatures = require('./../utils/APIFeatures')

exports.getAllPatients = async (req, res) => {
    try {

        const featuresForCount = new APIFeatures(Patient.find(), req.query)
            .filter()
            .sort()
            .limitFields();

        const searchCount = await featuresForCount.query.countDocuments();

        const features = new APIFeatures(Patient.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        const patients = await features.query
        //const count = await features.count();
        const fullCount = await Patient.countDocuments()


        res.status(200).json({
            status: 'success',
            data: {
                count: patients.length,
                searchCount,
                fullCount,
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
        res.status(200).json({
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
exports.getPatient = async (req, res) => {
    try {
        let patient = await Patient.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                patient
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'No such patient'
        })
    }
}
exports.deletePatient = async (req, res) => {

    try {

        let appCount = 0
        let appointments = await Appointment.find({ patient: req.params.id })
        const appointmentIds = appointments.map(appointment => appointment._id)
        appointments = []
        appointmentIds.forEach(a => {
            appointments.push(a.toString())
        })
        appointments.forEach(async a => {
            await Appointment.findByIdAndDelete(a)
            appCount++
        })

        const deleted = await Patient.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            appointmentsDeleted: appCount,
            data: {
                patient: deleted
            }
        })
    } catch (error) {
        res.status(400).json({
            satus: "fail",
            message: error
        })
    }
}
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                patient
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
        const patientID = req.params.id
        let appointments = await Appointment.find({ patient: patientID })
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
