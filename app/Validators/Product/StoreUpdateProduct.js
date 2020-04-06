'use strict'

class ProductsStoreUpdateProduct {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|max:45|string',
      unit_price: 'required|number'
    }
  }

  get messages () {
    return {
      'name.required': 'El nombre es obligatorio',
      'name.max': 'El límite de caracteres es 45',
      'name.string': 'Solo se permiten letras',
      'unit_price.required': 'El precio unitario es obligatorio',
      'unit_price.number': 'El valor debe ser numérico'
    }
  }
}

module.exports = ProductsStoreUpdateProduct
