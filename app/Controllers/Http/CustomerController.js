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
const LocationController = use('App/Controllers/Http/LocationController')

class CustomerController {

  async index ({ view, params, request, response }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const customers = await Customer.query()
                                    .where('name', 'LIKE', '%' + search + '%')
                                    .paginate(page, 5)
    const pagination = customers.toJSON()
    pagination.route = 'customers.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('customers.index', { customers: pagination })
    }
  }

  async create ({ request, response, view }) {
    const url = this.getMapKey()
    return view.render('customers.create', { url: url })
  }

  async store ({ request, response, session }) {
    try {
      const customer = request.only(Customer.store)
      const newCustomer = await Customer.create(customer)
      const locationData = request.only(LocationFields)
      locationData.customer_id = newCustomer.id
      const newLocation = new LocationController()
      const locationSaved = await newLocation.store({ locationData })
      if (locationSaved) {
        return response.route('customers.pagination')
      }
    } catch (error) {
      session.flashOnly(['name','phone','address', 'latitude'])
      session.flash({
        notification: {
          type: 'danger',
          message: `Ocurrió un error, intentelo de nuevo`
        }
      })
      return response.redirect('back')
    }
  }

  async show ({ params, view }) {
    const location = new LocationController()
    const customerLocation = await location.getLocation({ params })
    const url = this.getMapKey()
    return view.render('customers.location', { location: customerLocation[0], url })
  }

  async edit ({ params, request, response, view }) {
    const customer = await Customer.find(params.id)
    const url = this.getMapKey()
    const location = new LocationController()
    const customerLocation = await location.getLocation({ params })
    return view.render('customers.edit', { customer, url, location: customerLocation[0] })
  }

  async update ({ params, request, response }) {
    try {
      const customer = await Customer.findOrFail(params.id)
      const customerData = request.only(Customer.update)
      customer.merge(customerData)
      await customer.save()
      const location = new LocationController()
      const locationData = request.only(LocationUpdateFields)
      const locationUpdated = await location.update({ params, locationData })
      if (locationUpdated) {
        return response.route('customers.pagination')
      }
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

  async destroy ({ params, request, response }) {
    const cus = await Customer.find(params.id)
    await cus.delete()
    return response.redirect('/customers')
  }

  getMapKey() {
    return process.env.MAP_KEY
  }

}

module.exports = CustomerController
