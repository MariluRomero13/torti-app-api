'use strict'

class Login {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'El usuario es obligatorio',
      'password.required': 'La contraseña es obligatoria'
    }
  }
}

module.exports = Login
