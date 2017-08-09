let MongoClient = require('mongodb').MongoClient
const dburl = 'mongodb://localhost:27017/quickServicedb'

let data = {}
let utils = {}
utils.connect = async function() {
  try {
    data.dbdata = await MongoClient.connect(dburl)
  }
  catch(err) {
    //exception during connecting to db
    console.log(err)
  }
}

utils.close = function() {
  try {
    data.dbdata.close()
  }
  catch(err) {
    //exception during closing data base (maybe you haven't connected to)
    console.log(err)
  }
}

utils.findCar = async function(regNum) {
  return await data.dbdata.collection('cars').findOne({ "regNum" : regNum })
}

module.exports = utils
