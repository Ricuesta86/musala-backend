const { gateways, gatewayById } = require('../controllers/operation')
const { validateGetItem } = require('../validators/common')

const router = require('express').Router()

router.get('/gateways', gateways)
router.get('/gateway/:id', validateGetItem, gatewayById)

module.exports = router
