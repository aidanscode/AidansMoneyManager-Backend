const bcrypt = require('bcrypt')
const SALT_ROUNDS = parseInt(process.env['SALT_ROUNDS'])

const passwordUtils = {
  hash: async password => {
    return await bcrypt.hash(password, SALT_ROUNDS)
  },
  compare: async (password, hash) => {
    return await bcrypt.compare(password, hash)
  }
}

module.exports = passwordUtils
