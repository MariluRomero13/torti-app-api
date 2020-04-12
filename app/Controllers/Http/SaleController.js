'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
const moment = require('moment');
const User = use('App/Models/User')
const Sale = use('App/Models/Sale')
const SaleDetail = use('App/Models/SaleDetail')
const Employee = use('App/Models/Employee')
const Customer = use('App/Models/Customer')
const Database = use('Database')
const { validate } = use('Validator')
class SaleController {
  async index ({ view, params, request, response }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const sales = await Database
                            .select(['s.id as sale_id', 'c.name as customer', 's.status as sale_type',
                              Database.raw('SUM(sd.quantity * p.unit_price) as total'),
                              Database.raw('DATE_FORMAT(s.created_at, "%d-%m-%Y") as sale_date'),
                              Database.raw('CONCAT(e.name," ", e.paternal," ",e.maternal) as employee')])
                            .from('sales as s')
                            .innerJoin('customers as c', 'c.id', 's.customer_id')
                            .innerJoin('employees as e', 'e.id', 's.employee_id')
                            .innerJoin('sale_details as sd', 'sd.sale_id', 's.id')
                            .innerJoin('products as p', 'sd.product_id', 'p.id')
                            .where('s.created_at', 'LIKE', '%' + search + '%')
                            .groupBy('s.id')
                            .paginate(page, 5)
    const pagination = sales
    pagination.route = 'sales.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('sales.index', { sales: pagination })
    }
  }

  async store ({ request, response }) {
    const rules = {
      customer_id: 'required',
      employee_id: 'required',
      details: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.ok({
        status: false,
        message: 'Ingresa los campos'
      })
    }

    const saleData = request.only(Sale.store)
    saleData.status = 1
    const sale = await Sale.create(saleData)
    const saleDetails = request.input('details')
    const saleDetailsParsed = JSON.parse(saleDetails)
    for (const saleDetail of saleDetailsParsed) {
      const newSaleDetail = new SaleDetail()
      newSaleDetail.sale_id = sale.id
      newSaleDetail.product_id = saleDetail.product_id
      newSaleDetail.quantity = saleDetail.quantity
      await newSaleDetail.save()
    }

    return response.ok({
      success: true,
      message: 'Sale successfully created',
      data: ''
    })
  }

  async show ({ params, view }) {
    const sale = await Sale.find(params.id)
    const employee = await Employee.find(sale.employee_id)
    const customer = await Customer.find(sale.customer_id)
    const saleDetails = await Database
    .select('p.name as product', 'p.unit_price as price', 'sd.quantity as quantity')
    .from('sale_details as sd')
    .innerJoin('products as p', 'sd.product_id', 'p.id')
    .where('sd.sale_id', sale.id)
    const total = await Database
    .select([Database.raw('SUM(sd.quantity * p.unit_price) as total')])
    .from('sale_details as sd')
    .innerJoin('products as p', 'sd.product_id', 'p.id')
    .where('sd.sale_id', sale.id)
    return view.render('sales.details', { sale: sale.toJSON(), employee: employee.toJSON(), customer: customer.toJSON(),
      sale_details: saleDetails, total: total })
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }

  async getSalesHistory({ auth }) {
    const userLogged = await auth.getUser()
    const user = await User.find(userLogged.id)
    const employee = await Employee.findBy('user_id', user.id)
    const day = moment().isoWeekday()

    const assignments = await Database.raw('call get_sales_history(?, ?)',[day,employee.id])
    return assignments[0][0]
  }

}

module.exports = SaleController
