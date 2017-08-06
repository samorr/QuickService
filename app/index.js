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
  searchEl.addEventListener('submit', async function (event) {
    event.preventDefault()
    let regNum = document.getElementById('regNum').value
    await findAndDisplayCar(regNum)
  })
}

findAndDisplayCar = async function(regNum) {
  let car = await db.findCar(regNum)
}



module.exports = model