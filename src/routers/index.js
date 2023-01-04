const router = require('express').Router()
const fs = require('fs')

const PATH_ROUTERS = __dirname

const removeExtension = (fileName) => {
  return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTERS).filter((file) => {
  const name = removeExtension(file)
  if (name !== 'index') {
    router.use(`/api/${name}`, require(`./${file}`))
  }
})

module.exports = router
