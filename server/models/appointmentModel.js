const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Appointment must have a date!']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Appointment must have a doctor!']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Appointment must have a patient!']
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;