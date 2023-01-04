const device = require('../models/device')

const fetchDevice = async (id) => {
  const data = await device.find({ gateway: id })
  return data
}

module.exports = { fetchDevice }
