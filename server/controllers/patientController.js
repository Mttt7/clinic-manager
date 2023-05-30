const Patient = require('./../models/patientModel')

exports.getAllPatients = async (req, res) => {
    console.log('jo')
    try {
        const patients = await Patient.find()
        console.log(patients)
        res.status(200).json({
            status: 'success',
            data: {
                patients
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: {
                message: 'fail'
            }
        })
    }

}