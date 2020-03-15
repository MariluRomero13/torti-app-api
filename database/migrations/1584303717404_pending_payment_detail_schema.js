'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PendingPaymentDetailSchema extends Schema {
  up () {
    this.create('pending_payment_details', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('pending_payment_id').unsigned().references('id').inTable('pending_payments')
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pending_payment_details')
  }
}

module.exports = PendingPaymentDetailSchema
