require('dotenv').config()
const { exec } = require('child_process')
const crypto = require('crypto')

const jwtSecret = crypto.randomBytes(32).toString('hex')
exec(
  `sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=${jwtSecret}/g" .env`,
  (error, _, stderr) => {
    if (error || stderr) {
      console.error(error, stderr)
    } else {
      console.log('Successfully inserted JWT secret')
    }
  }
)
