'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.integer('employee_id').unsigned().references('id').inTable('employees')
      table.integer('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
