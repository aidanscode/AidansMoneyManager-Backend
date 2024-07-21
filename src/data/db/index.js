const dbUrl = `${process.env['COUCHDB_URL']}`
const nano = require('nano')(dbUrl)

class Database {
  constructor(dbName) {
    this.dbName = dbName
    this.db = nano.use(dbName)
  }

  static getDatabaseName(baseName) {
    return `${process.env['DB_PREFIX']}${baseName}`
  }

  async get(id) {
    try {
      const doc = await this.db.get(id)
      return doc
    } catch (error) {
      if (error.statusCode == 404) return null
      throw error
    }
  }

  async insert(doc, id = undefined) {
    return await this.db.insert(doc, id)
  }
}

module.exports = Database
