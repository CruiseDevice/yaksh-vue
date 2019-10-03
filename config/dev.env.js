'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const validate_url = "API_URL"
const token = "API_TOKEN" //"d88812ee582e2ab6bb0cdd93faa600541a2bcb39"


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VALIDATE_URL: validate_url,
  TOKEN: token
})
