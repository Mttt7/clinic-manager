const Doctor = require('../models/doctorModel')


exports.getAllDoctors = async (req, res) => {
    try {
        //---execute query---
        console.log(req.query)

        //const features = new APIFeatures(Doctor.find(),req.query)





        const doctors = await Doctor.find()

        //---send response---
        res.status(200).json({
            status: 'success',
            data: {
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