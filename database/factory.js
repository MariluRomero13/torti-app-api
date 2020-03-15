'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Role', (faker, i, data) => {
  return {
    name: data.name
  }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    role_id: data.role_id,
    username: data.username,
    password: data.password
  }
})

Factory.blueprint('App/Models/Employee', (faker, i, data) => {
  return {
    user_id: data.user_id,
    name: data.name,
    paternal: data.paternal,
    maternal: data.maternal,
    phone: data.phone,
    address: data.address
  }
})

Factory.blueprint('App/Models/Customer', (faker, i, data) => {
  return {
    name: data.name,
    phone: data.phone,
    address: data.address
  }
})


Factory.blueprint('App/Models/Product', (faker, i, data) => {
  return {
    name: data.name,
    unit_price: data.unit_price
  }
})

Factory.blueprint('App/Models/AssignmentCustomer', (faker, i, data) => {
  return {
    employee_id: data.employee_id,
    customer_id: data.customer_id,
    day: data.day
  }
})

Factory.blueprint('App/Models/Sale', (faker, i, data) => {
  return {
    employee_id: data.employee_id,
    customer_id: data.customer_id,
    status: data.status
  }
})

Factory.blueprint('App/Models/SaleDetail', (faker, i, data) => {
  return {
    sale_id: data.sale_id,
    product_id: data.product_id,
    quantity: data.quantity
  }
})

Factory.blueprint('App/Models/PendingPayment', (faker, i, data) => {
  return {
    customer_id: data.customer_id,
    deposit: data.deposit
  }
})

Factory.blueprint('App/Models/PendingPaymentDetail', (faker, i, data) => {
  return {
    pending_payment_id: data.pending_payment_id,
    product_id: data.product_id,
    quantity: data.quantity
  }
})
