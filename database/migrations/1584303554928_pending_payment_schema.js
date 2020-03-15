'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PendingPaymentSchema extends Schema {
  up () {
    this.create('pending_payments', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.decimal('deposit', 10,2)
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('pending_payments')
  }
}

module.exports = PendingPaymentSchema
