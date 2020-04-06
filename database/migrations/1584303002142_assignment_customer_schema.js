'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssignmentCustomerSchema extends Schema {
  up () {
    this.create('assignment_customers', (table) => {
      table.increments()
      table.integer('employee_id').unsigned().references('id').inTable('employees')
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.int('day').notNullable()
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('assignment_customers')
  }
}

module.exports = AssignmentCustomerSchema
