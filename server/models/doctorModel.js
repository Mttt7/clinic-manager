const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor must have a name!'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Doctor must have a surname!'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Doctor must have a birth date!']
    },
    specialization: {
        type: String,
        required: [true, 'Doctor must have a specialization!']
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;