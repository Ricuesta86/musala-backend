const { deviceModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

/**
 * List items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await deviceModel.find({})
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * Get a detail
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await deviceModel.findById(id)
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
 * Insert a record
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const cantDevice = await deviceModel.find({ gateway: id }).count()
    if (cantDevice >= 10) return handleHttpError(res, 'Sorry, The gateway has 10 peripheral devices.')
    const data = await deviceModel.create({
      uid: Date.now(),
      dateCreate: new Date(body.dateCreate),
      gateway: id,
      ...body
    })
    res.json({ data, cantDevice })
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_ITEM')
  }
}

/**
 * Update a record
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    const data = await deviceModel.findOneAndUpdate(id, body)
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
 * Delete a record
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await deviceModel.findByIdAndDelete({ _id: id })
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
