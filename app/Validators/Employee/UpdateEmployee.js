'use strict'

class EmployeeUpdateEmployee {
  get validateAll () {
    return true
  }

  get rules () {
    const employeeId = this.ctx.params.id
    return {
      username: 'required|max:80',
      password: 'max:60|min:5',
      name: 'required|max:60|string',
      paternal: 'required|max:60|string',
      maternal: 'required|max:60|string',
      phone: `required|max:15|min:10|number|unique:employees,phone,id,${employeeId}`,
      address: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'El nombre de usuario es obligatorio',
      'username.max': 'El límite de caracteres es 80',
      'password.max': 'El límite de caracteres es 60',
      'password.min': 'La contraseña debe contener al menos 5 caracteres',
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

module.exports = EmployeeUpdateEmployee
