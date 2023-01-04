
const { matchedData } = require('express-validator')
const { gatewayModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')

/**
 * Get list from database
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await gatewayModel.find({})
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
    const data = await gatewayModel.findById(id)
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
    const body = matchedData(req)
    const data = await gatewayModel.create(body)
    res.json({ data })
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
    const data = await gatewayModel.findOneAndUpdate(id, body)
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
    const data = await gatewayModel.findByIdAndDelete({ _id: id })
    res.json({ data })
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEM')
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
