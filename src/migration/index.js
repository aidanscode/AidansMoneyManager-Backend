require('dotenv').config()
const migrateDown = require('./down')
const migrateUp = require('./up')

const command = process.argv[process.argv.length - 1]

if (command.toLocaleLowerCase() == 'down') {
  migrateDown()
} else {
  migrateUp()
}
