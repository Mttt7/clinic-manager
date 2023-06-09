const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Doctor must have a fullName!'],
        trim: true
    },
    sex: {
        type: String,
        required: [true, 'Doctor must have sex!'],
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