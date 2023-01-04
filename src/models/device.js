const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema({
  uid: { type: Number, required: true, unique: true },
  vendor: { type: String, required: [true, 'The vendor is necessary'] },
  dateCreate: { type: Date, required: true },
  status: { type: Boolean, required: true },
  gateway: { type: Schema.Types.ObjectId, ref: 'Gateway', required: true }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('devices', deviceSchema)
