let car = {
  "regNum" : "REG_NUM_MASK",
  "phone" : "PHONE_NUM_MASK",
  "VIN": "VIN_MASK",
  "brand" : "BRAND_MASK",
  "model" : "MODEL_MASK",
  "yearOfProd" : "YEAR_OF_PROD_MASK",
  "engine" : {
      "engineCapacity" : "ENGINE_CAPACITY_MASK",
      "power" : {
          "horsepower" : "ENGINE_POWER_IN_HORSEPOWER_MASK",
          "kW" : "ENGINE_POWER_IN_KW_MASK"
      },
      "fuel" : "FUEL_MASK"
  },
  "filters" : {
    "airFilter" : "AIR_FILTER_MASK",
    "oilFilter" : "OIL_FILTER_MASK",
    "fuelFilter" :"FUEL_FILTER_MASK",
      "cabin" : "CABIN_FILTER_MASK"
  },
  "oil" : {
    "oilCapacity" : "OIL_CAPACITY_MASK",
    "usedBefore" : "USED_BEFORE_OIL_MASK"
  }
}

module.exports = car;