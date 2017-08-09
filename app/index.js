const {ipcRenderer} = require('electron')
let db = require('./dbutils/connection.js')

let model = {}

model.prepareDBConnection = async function() {
  await db.connect()
}

model.prepareCloseButton = function() {
  let closeEl = document.querySelector('.close-button')
  closeEl.addEventListener('click', function () {
    db.close()
    ipcRenderer.send('close-main-window')
  })
}

model.prepareSearchButton = function() {
  let searchEl = document.querySelector('.search-button')
  searchEl.addEventListener('click', async function (event) {
    event.preventDefault()
    let regNumButton = document.querySelector('#regNumSearch')
    await findAndDisplayCar(regNumButton.value)
    regNumButton.value = ""
  })
}

findAndDisplayCar = async function(regNum) {
  let car = await db.findCar(regNum)
  await displayCar(car)
}

displayCar = function(car) {
  let tableLink = document.querySelector('link[rel="import"]')
  let content = tableLink.import
  let table = content.querySelector('#car-table')
  insertCarDataInTable(car, table)
  document.querySelector('.container').appendChild(table.cloneNode(true))
}

insertCarDataInTable = function(data, table) {
  Object.keys(data).forEach((key, index) => {
    if(typeof data[key] === 'string') {
      let com = table.querySelector('#' + key)
      if(com != null)
        com.innerHTML = data[key]
    }
    else
      insertCarDataInTable(data[key], table)
  })
}

module.exports = model