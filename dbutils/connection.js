let MongoClient = require('mongodb').MongoClient
const dburl = "mongodb://localhost:27017/quickServicedb"

let data = {}
try {
  MongoClient.connect(dburl, async function(err, db) {
    data.dbdata = db
  })
}
catch(err) {
  //nieudane polaczenie do bazy
  console.log(err)
}

data.close = function() {
    data.dbdata.close()
}

module.exports = data
