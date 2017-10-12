const {ipcRenderer} = require('electron')
const {BrowserWindow} = require('electron').remote
const path = require('path')
const url = require('url')
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

model.prepareNewCarButton = function() {
  document.querySelector('.new-car-button').addEventListener('click', async function (event) {
    event.preventDefault()
    let child = new BrowserWindow({width: 1000, height: 800})
    child.loadURL(url.format({
      pathname: path.join(__dirname, '/views/car-edit-table.html'),
      protocol: 'file:',
      slashes: true
    }))

  })
}

findAndDisplayCar = async function(regNum) {
  let car = await db.findCar(regNum)
  if(await car != undefined) {
    await displayCar(car)
  }
}

displayCar = function(car) {
  let tableLink = document.querySelector('link[rel="import"]')
  let content = tableLink.import
  let table = content.querySelector('#car-table')
  insertCarDataInTable(car, table)
  let oldTable = document.querySelector('#car-table')
  let panel = document.querySelector('.panel')
  if (oldTable == undefined || !panel.contains(oldTable)) {
    panel.appendChild(table.cloneNode(true))
  } else {
    panel.removeChild(oldTable)
    panel.appendChild(table.cloneNode(true))
  }
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