'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  sale_details () {
    return this.belongsTo('App/Model/SaleDetail', 'sale_id')
  }

  customer () {
    return this.hasMany('App/Model/Customer', 'customer_id')
  }

  employee () {
    return this.hasMany('App/Model/Employee', 'employee_id')
  }

  static get store () {
    return [
      'customer_id',
      'employee_id',
      'status'
    ]
  }
}

module.exports = Sale
