'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
const LocationModel = use('App/Models/Mongo/Location')
const LocationFields = LocationModel.fields
const LocationUpdateFields = LocationModel.updateFields
const Location = LocationModel.Location


const Customer = use('App/Models/Customer')
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const customers = await Customer.all()
    return view.render('customers.index', { customers:customers.toJSON() })
  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('customers.create')
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const cus = request.only(Customer.store)
    try {
      await Customer.create(cus)
      return response.route('customers.index')
    } catch (error) {
      session.flashOnly(['name','phone','address','status'])
      session.flash({
        notification: {
          type: 'danger',
          message: `Ocurrió un error, intentelo de nuevo`
        }
      })
      return response.redirect('back')
    }
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const cus = await Customer.find(params.id)
    return view.render('customers.edit',{
      cus
    })
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const cus = await Customer.findOrFail(params.id)
      const cusData = request.only(Customer.update)
      cus.merge(cusData)
      await cus.save()
      return response.route('customers.index')
    } catch(error) {
      session.flash({
        notification: {
          type: 'danger',
          message: `Ocurrió un error, intentelo de nuevo`
        }
      })
      return response.redirect('back')
    }
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const cus = await Customer.find(params.id)
    await cus.delete()
    return response.redirect('/customers')
  }

  async editLocation({params,request,response,view}){
    const customerLocation = await Location.find({ customer_id: { $eq: params.id } },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    
      return view.render('locations.edit',{
        customerLocation
      })
  }

  
}

module.exports = CustomerController
