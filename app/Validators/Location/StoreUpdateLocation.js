'use strict'

class StoreUpdateLocation {
  get validateAll () {
    return true
  }
  
  get rules () {
    return {
      customer_id: 'required',
      latitude: 'required|number',
      longitude:'required|number',
      status:'required|number'
    }
  }

  get messages () {
    return {
      'customer_id.required': 'Este campo es obligatorio',
      'latitude.required': 'Este campo es obligatorio',
      'longitude.required': 'Este campo es obligatorio',
      'latitude.number':'Solo se permiten numeros',
      'longitude.number':'Solo se permiten numeros',
      'status.number': 'Solo se admiten numeros',
      'status.required': 'Este campo es obligatorio'
    }
  }
}

module.exports = StoreUpdateLocation
