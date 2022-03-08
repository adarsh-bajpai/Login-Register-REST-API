const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LoginSchema = new Schema({
    email: {
        type: String,
        required: true,
        min:6
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
},{timestamps: true})

const LoginSchemaModel = mongoose.model('LoginSchema',LoginSchema)
module.exports = LoginSchemaModel