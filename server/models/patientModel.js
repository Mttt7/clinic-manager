const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Patient must have a fullName!'],
        trim: true
    },
    sex: {
        type: String,
        required: [true, 'Patient must have sex!'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Patient must have a birth date!']
    },
    pesel: {
        type: String,
        required: [true, 'Patient must have a PESEL!']
    },
    city: {
        type: String,
        required: [true, 'Patient must have a city!']
    },
    address: {
        type: String,
        required: [true, 'Patient must have an address!']
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;