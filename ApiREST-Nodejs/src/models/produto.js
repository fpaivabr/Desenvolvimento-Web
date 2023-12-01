const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS produto (codigo TEXT, nome TEXT, preco REAL)");
});

module.exports = db;

