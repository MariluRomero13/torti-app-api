'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  sale_details () {
    return this.hasMany('App/Models/SaleDetail', 'id', 'sale_id')
  }

  customer () {
    return this.hasMany('App/Models/Customer', 'customer_id')
  }

  employee () {
    return this.hasMany('App/Models/Employee', 'employee_id')
  }

  static get store () {
    return [
      'customer_id',
      'employee_id',
      'status' // vendido 1, pendiente 0
    ]
  }
}

module.exports = Sale
