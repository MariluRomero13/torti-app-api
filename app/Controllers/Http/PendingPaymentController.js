'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingpayments
 */
const PendingPayment = use('App/Models/PendingPayment')
const PendingPaymentDetail = use('App/Models/PendingPaymentDetail')
const { validate } = use('Validator')
class PendingPaymentController {
  /**
   * Show a list of all pendingpayments.
   * GET pendingpayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pendingpayment.
   * GET pendingpayments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pendingpayment.
   * POST pendingpayments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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

  /**
   * Display a single pendingpayment.
   * GET pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const pendingPayment = await PendingPayment.findBy('customer_id', params.customer_id)
    const pendingPaymentDetails = await PendingPaymentDetail.query()
      .where('pending_payment_id', pendingPayment.id).fetch()

    const paymentsData = await Database.raw('call getTotal(?)',[params.customer_id])
    return response.ok(
      { pendingPayment: pendingPayment ,
        pendingPaymentDetails: pendingPaymentDetails,
        paymentData: paymentsData[0][0]
      })
  }


  /**
   * Render a form to update an existing pendingpayment.
   * GET pendingpayments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pendingpayment details.
   * PUT or PATCH pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pendingpayment with id.
   * DELETE pendingpayments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PendingPaymentController
