const db = require('../../database/db')

module.exports = {
    all(){
        return db.query(`
            SELECT * FROM categories
        `)
    }
}