'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingpayments
 */
const Customer = use('App/Models/Customer')
const PendingPayment = use('App/Models/PendingPayment')
const PendingPaymentDetail = use('App/Models/PendingPaymentDetail')
const Database = use('Database')
const { validate } = use('Validator')
class PendingPaymentController {

  async index ({ request, response, view, params }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const payments = await Database
                            .select(['pp.id as pending_payment_id', 'c.name as customer', 'pp.status as payment_type',
                              Database.raw('SUM(ppd.quantity * p.unit_price) as total'),
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
      details: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.ok({
        status: false,
        message: 'Ingresa los campos'
      })
    }

    const pendingPaymentData = request.only(PendingPayment.store)
    const pendingPayment = await PendingPayment.create(pendingPaymentData)
    const pendingPaymentDetails = request.input('details')
    const pendingPaymentDetailsParsed = JSON.parse(pendingPaymentDetails)
    for (const pendingPaymentDetail of pendingPaymentDetailsParsed) {
      const newPendingPaymentDetail = new PendingPaymentDetail()
      newPendingPaymentDetail.pending_payment_id = pendingPayment.id
      newPendingPaymentDetail.product_id = pendingPaymentDetail.product_id
      newPendingPaymentDetail.quantity = pendingPaymentDetail.quantity
      await newPendingPaymentDetail.save()
    }

    return response.ok({
      success: true,
      message: 'Pending Payment successfully created',
      data: ''
    })
  }

  async show ({ params, response }) {
    const pendingPayment = await PendingPayment.findBy('customer_id', params.customer_id)
    const pendingPaymentDetails = await Database
      .select('ppd.quantity as quantity', 'p.id as product_id', 'p.name as product')
      .from('pending_payment_details as ppd')
      .innerJoin('products as p', 'ppd.product_id', 'p.id')
      .where('ppd.pending_payment_id', pendingPayment.id)

    const paymentsData = await Database.raw('call getTotal(?)',[params.customer_id])
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
}

module.exports = PendingPaymentController
