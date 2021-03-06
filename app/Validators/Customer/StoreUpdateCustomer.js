'use strict'

class StoreUpdateCustomer {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|max:45|string',
      phone: 'required|number',
      address:'required|max:45|string',
      latitude: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'Este campo es obligatorio',
      'name.max': 'El limite de caracteres es 45',
      'name.string': 'Solo se permiten letras',
      'phone.required':'Este campo es obligatorio',
      'phone.number':'Solo se permiten numeros',
      'address.required': 'Este campo es obligatorio',
      'address.max': 'El limite de caracteres es 45',
      'address.string': 'Solo se permiten letras',
      'latitude.required': 'Las coordenadas son obligatoria'
    }
  }
}

module.exports = StoreUpdateCustomer
