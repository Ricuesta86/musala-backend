const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateGetItem = [
  check('id')
    .exists()
    .not()
    .isEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResult(req, res, next)
  }
]

module.exports = { validateGetItem }
