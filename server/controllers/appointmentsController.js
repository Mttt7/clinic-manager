const Appointment = require('../models/appointmentModel')
const Doctor = require('../models/doctorModel')
const Patient = require('../models/patientModel')
const APIFeatures = require('./../utils/APIFeatures')

exports.getAllAppointments = async (req, res) => {
    try {

        const features = new APIFeatures(Appointment.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        let appointments = await features.query

        const doctorIds = appointments.map(appointment => appointment.doctor)
        const patientIds = appointments.map(appointment => appointment.patient)

        // const doctors = await Doctor.find({ _id: { $in: doctorIds } })
        const doctors = await Doctor.aggregate([
            { $match: { _id: { $in: doctorIds } } }

        ])
        const patients = await Patient.find({ _id: { $in: patientIds } })

        appointments = appointments.map(appointment => {
            const doctor = doctors.find(doctor => doctor._id.equals(appointment.doctor))
            const patient = patients.find(patient => patient._id.equals(appointment.patient))

            return {
                _id: appointment._id,
                date: appointment.date,
                doctor,
                patient
            }
        })
        appointments.sort((a, b) => new Date(a.date).getFullYear - new Date(b.date).getFullYear)
        const fullCount = await Appointment.countDocuments()
        //---send response---
        res.status(200).json({
            status: 'success',
            data: {

                count: appointments.length,
                fullCount,
                appointments
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
exports.addNewAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req.body)
        res.status(200).json({
            status: 'success',
            data: {
                appointment: newAppointment
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
exports.getAppointment = async (req, res) => {
    try {

        let appointment = await Appointment.findById(req.params.id) //= Appointment.findOne({ _id: req.params.id})

        const doctorId = appointment.doctor
        const patientId = appointment.patient

        const doctor = await Doctor.findById(doctorId)
        const patient = await Patient.findById(patientId)

        appointment = {
            _id: appointment._id,
            date: appointment.date,
            doctor,
            patient

        }



        res.status(200).json({
            status: 'success',
            data: {
                appointment
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'No such appointment'
        })
    }
}
exports.deleteAppointment = async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: {
                appointment: deleted
            }
        })
    } catch (error) {
        res.status(400).json({
            satus: "fail",
            message: error
        })
    }
}
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                appointment
            }
        })
    } catch (error) {
        res.status(400).json({
            satus: "fail",
            message: error
        })
    }
}
