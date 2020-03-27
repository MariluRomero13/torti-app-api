'use strict'

class StoreUpdateRole {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|max:45|string',
    }
  }

  get messages () {
    return {
      'name.required': 'El nombre es obligatorio',
      'name.max': 'El limite de caracteres es 45',
      'name.string': 'Solo se permiten letras',
    }
  }
}

module.exports = StoreUpdateRole
