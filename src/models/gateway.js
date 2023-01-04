const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const gatewaySchema = new Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: { type: String, required: [true, 'The name is necessary'] },
  ipAddress: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

gatewaySchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' })

module.exports = mongoose.model('gateways', gatewaySchema)
