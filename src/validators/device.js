const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreateItem = [
  check('vendor')
    .exists()
    .not()
    .isEmpty(),
  check('dateCreate')
    .exists()
    .not()
    .isEmpty()
    .isDate(['-']),
  check('status')
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateItem }
