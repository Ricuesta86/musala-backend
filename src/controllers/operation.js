const gateway = require('../models/gateway')
const { fetchDevice } = require('../utils/db')
const { handleHttpError } = require('../utils/handleError')

/**
 * List all gateways with their peripheral devices
 * @param {*} req
 * @param {*} res
 */
const gateways = async (req, res) => {
  try {
    const data = []
    const dataGateway = await gateway.find({})

    for (const iterator of dataGateway) {
      const devices = await fetchDevice(iterator.id).then(value => value, err => err)
      data.push({ gateway: iterator, devices })
    }
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * Get gateway with your peripheral devices
 * @param {*} req
 * @param {*} res
 */
const gatewayById = async (req, res) => {
  try {
    const id = req.params.id
    const dataGateway = await gateway.find({ _id: id })
    const devices = await fetchDevice(dataGateway[0].id).then(value => value, err => err)
    res.json({ data: { gateway: dataGateway[0], devices } })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

module.exports = { gateways, gatewayById }
