'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingpayments
 */
const Customer = use('App/Models/Customer')
const Sale = use('App/Models/Sale')
const SaleDetail = use('App/Models/SaleDetail')
const User = use('App/Models/User')
const Employee = use('App/Models/Employee')
const PendingPayment = use('App/Models/PendingPayment')
const PendingPaymentDetail = use('App/Models/PendingPaymentDetail')
const Database = use('Database')
const { validate } = use('Validator')
class PendingPaymentController {

  async index ({ request, response, view, params }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const payments = await Database
                            .select(['pp.id as pending_payment_id', 'c.name as customer',
                              'pp.status as payment_type', 'pp.deposit as deposit',
                              Database.raw('SUM(ppd.quantity * p.unit_price) as total'),
                              Database.raw('(SUM(ppd.quantity * p.unit_price) - pp.deposit) as to_pay'),
                              Database.raw('DATE_FORMAT(pp.created_at, "%d-%m-%Y") as payment_date')])
                            .from('pending_payments as pp')
                            .innerJoin('customers as c', 'c.id', 'pp.customer_id')
                            .innerJoin('pending_payment_details as ppd', 'ppd.pending_payment_id', 'pp.id')
                            .innerJoin('products as p', 'ppd.product_id', 'p.id')
                            .where('pp.created_at', 'LIKE', '%' + search + '%')
                            .groupBy('pp.id')
                            .paginate(page, 5)
    const pagination = payments
    pagination.route = 'payments.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('payments.index', { payments: pagination })
    }
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const rules = {
      customer_id: 'required',
      deposit: 'required|number',
      details: 'required|array',
      'details.*.product_id': 'required|integer',
      'details.*.quantity': 'required|integer|min:1'
    }


    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    const pendingPaymentData = request.only(PendingPayment.store)
    const pendingPaymentDetails = request.input('details')
    const trx = await Database.beginTransaction()
    try {
      const pendingPayment = await PendingPayment.create(pendingPaymentData, trx)
      await pendingPayment.pending_payment_details().createMany(pendingPaymentDetails, trx)
    } catch (error) {
      await trx.rollback()
      return response.badRequest()
    }

    await trx.commit()
    return response.ok({
      success: true,
      message: 'Pending Payment successfully created'
    })
  }

  async show ({ params, response }) {
    const pendingPayment = await PendingPayment.find(params.id)
    const pendingPaymentDetails = await Database
      .select('ppd.quantity as quantity', 'p.id as product_id', 'p.name as product')
      .from('pending_payment_details as ppd')
      .innerJoin('products as p', 'ppd.product_id', 'p.id')
      .where('ppd.pending_payment_id', pendingPayment.id)

    const paymentsData = await Database.raw('call getTotal(?)',[pendingPayment.id])
    return response.ok(
      { pendingPayment: pendingPayment ,
        pendingPaymentDetails: pendingPaymentDetails,
        paymentData: paymentsData[0][0]
      })
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }

  async getPaymentDetail({ params, view }) {
    const payment = await PendingPayment.find(params.id)
    const customer = await Customer.find(payment.customer_id)
    const pendingPaymentDetails = await Database
    .select('p.name as product', 'p.unit_price as price', 'ppd.quantity as quantity')
    .from('pending_payment_details as ppd')
    .innerJoin('products as p', 'ppd.product_id', 'p.id')
    .where('ppd.pending_payment_id', payment.id)

    const total = await Database
    .select([Database.raw('SUM(ppd.quantity * p.unit_price) as total')])
    .from('pending_payment_details as ppd')
    .innerJoin('products as p', 'ppd.product_id', 'p.id')
    .where('ppd.pending_payment_id', payment.id)

    return view.render('payments.detail', { payment: payment.toJSON(), customer: customer.toJSON(),
      payment_details: pendingPaymentDetails, total: total })
  }

  async setDeposit({ request, response, auth }) {
    const rules = {
      payment_id: 'required|number',
      newDeposit: 'required|number'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return response.ok({
        status: false,
        message: 'Ingresa los campos para continuar'
      })
    }
    const { payment_id, newDeposit } = request.only(['payment_id', 'newDeposit'])
    const payment = await PendingPayment.find(payment_id)
    const paymentsData = await Database.raw('call getTotal(?)',[payment.id])
    const { total, to_pay, deposit } = paymentsData[0][0][0]
    let status = 0
    let message = ''
    if (newDeposit < to_pay) {
      payment.deposit = parseFloat(deposit) + parseFloat(newDeposit);
      await payment.save()
      status = 0
      message = 'Deposit successfully saved'
    } else if (newDeposit > to_pay) {
      status = 2
      message = "Deposit is greater than total to pay"
    } else {
      const userLogged = await auth.getUser()
      const user = await User.find(userLogged.id)
      const employee = await Employee.findBy('user_id', user.id)
      const pendingPaymentDetails = await PendingPaymentDetail.query()
        .where('pending_payment_id',payment.id).fetch()
      const data = { customer_id: payment.customer_id, employee_id: employee.id,
        details: pendingPaymentDetails }
      const sale = await this.saveSale({ data })

      if (sale) {
        payment.status = 0
        payment.deposit = parseFloat(deposit) + parseFloat(newDeposit);
        await payment.save()
        status = 1
        message = 'Pending payment was removed and added in sales'
      }
    }

    return response.ok({
      status: status,
      message: message
    })
  }

  async saveSale({ data }) {
    const { customer_id, employee_id, details } = data
    const saleData = {
      customer_id: customer_id,
      employee_id: employee_id,
      status: 0
    }
    const sale = await Sale.create(saleData)
    for (const saleDetail of details.toJSON()) {
      const newSaleDetail = new SaleDetail()
      newSaleDetail.sale_id = sale.id
      newSaleDetail.product_id = saleDetail.product_id
      newSaleDetail.quantity = saleDetail.quantity
      await newSaleDetail.save()
    }

    return sale
  }
}

module.exports = PendingPaymentController
