var low = require('lowdb'); //database (lowdb)

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter); //truy xuất dữ liệu
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

module.exports = db;