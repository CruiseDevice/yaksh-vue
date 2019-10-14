'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// const validate_url = '"http://localhost:8000/api/validate/"'
// const token = '8ebb5a54048458a8bd73da259391a092c6627f1d' //"d88812ee582e2ab6bb0cdd93faa600541a2bcb39"


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // VALIDATE_URL: validate_url,
  // TOKEN: token
})
