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
        appointments.sort((a, b) => new Date(a.date) - new Date(b.date))

        //---send response---
        res.status(200).json({
            status: 'success',
            data: {
                count: appointments.length,
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

