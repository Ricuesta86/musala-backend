const router = require('express').Router()
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/device')
const { validateGetItem } = require('../validators/common')
const { validateCreateItem } = require('../validators/device')

/**
 * List the Items
 */
router.get('/', getItems)
/**
 * Get a Item detail
 */
router.get('/:id', validateGetItem, getItem)
/**
 * Insert a record
*/
router.post('/gateway/:id', validateCreateItem, validateGetItem, createItem)
/**
 * Update a record
 */
router.put('/:id', validateCreateItem, validateGetItem, updateItem)
/**
 * Delete a record
 */
router.delete('/:id', validateGetItem, deleteItem)

module.exports = router
