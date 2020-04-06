'use strict'

class EmployeeStoreEmployee {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|max:80|unique:users,username',
      password: 'required|max:60|min:5',
      role_id: 'required',
      name: 'required|max:60|string',
      paternal: 'required|max:60|string',
      maternal: 'required|max:60|string',
      phone: 'required|max:15|min:10|number|unique:employees,phone',
      address: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'El nombre de usuario es obligatorio',
      'username.max': 'El límite de caracteres es 80',
      'username.unique': 'El nombre de usuario debe ser unico',
      'password.required': 'La contraseña es obligatoria',
      'password.max': 'El límite de caracteres es 60',
      'password.min': 'La contraseña debe contener al menos 5 caracteres',
      'role_id.required': 'El rol es obligatorio',
      'name.required': 'El nombre es obligatorio',
      'name.max': 'El límite de caracteres es 60',
      'name.string': 'Solo se permiten letras',
      'paternal.required': 'El apellido paterno es obligatorio',
      'paternal.max': 'El límite de caracteres es 60',
      'paternal.string': 'Solo se permiten letras',
      'maternal.required': 'El apellido materno es obligatorio',
      'maternal.max': 'El límite de caracteres es 60',
      'maternal.string': 'Solo se permiten letras',
      'phone.required': 'El teléfono es obligatorio',
      'phone.number': 'El valor debe ser numérico',
      'phone.max': 'El límite de caracteres es 15',
      'phone.min': 'El teléfono debe contener al menos 10 caracteres',
      'phone.unique': 'El teléfono debe ser unico',
      'address.required': 'La dirección es obligatoria'
    }
  }
}

module.exports = EmployeeStoreEmployee
