const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreateItem = [
  check('serialNumber')
    .exists()
    .not()
    .isEmpty(),
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('ipAddress')
    .exists()
    .not()
    .isEmpty()
    .isIP([4])
    .withMessage('it is invalid'),
  (req, res, next) => {
    return validateResult(req, res, next)
  }
]

module.exports = { validateCreateItem }
