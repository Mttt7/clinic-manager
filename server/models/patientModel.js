const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient must have a name!'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Patient must have a surname!'],
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