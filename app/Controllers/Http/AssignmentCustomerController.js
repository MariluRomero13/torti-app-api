'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with assignmentcustomers
 */
const moment = require('moment');
const User = use('App/Models/User')
const Employee = use('App/Models/Employee')
const Database = use('Database')
const AssignmentCustomer = use('App/Models/AssignmentCustomer')
const Customer = use('App/Models/Customer')
class AssignmentCustomerController {

  async index ({ request, response, view, params }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const assigments = await Database.select(
                    [Database.raw('e.id as employee_id, CONCAT(e.name," ", e.paternal," ", e.maternal) as employee'), 'c.name as customer', 'ac.day'])
                    .from('assignment_customers as ac')
                    .innerJoin('customers as c','c.id', 'ac.customer_id')
                    .innerJoin('employees as e', 'e.id', 'ac.employee_id')
                    .where('e.name', 'LIKE', '%' + search + '%')
                    .orWhere('e.paternal', 'LIKE', '%' + search + '%')
                    .orWhere('e.maternal', 'LIKE', '%' + search + '%')
                    .orderBy('e.id', 'asc')
                    .paginate(page, 5)
    const pagination = assigments
    pagination.route = 'assignment-customers.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('assignment-customers.index', { assigments: pagination })
    }
  }

  async create ({ request, view }) {
    const search = request.input('search') || ''
    const employees = await Employee.all()
    const assignments = await Database.raw('call get_assignments(?)',[search])
    var arrayassignments=[]
    assignments[0][0].forEach(function(item, index, array){
      if(item.days){
        item.days=item.days.split(',')
      }else{
        item.days=[]
      }
      arrayassignments.push(item)
    })
    return view.render('assignment-customers.create', { assignments: arrayassignments, employees: employees.toJSON() })
  }

  async store ({ request, response }) {
    const a = request.all()
    await AssignmentCustomer.query().where('customer_id',a.customer_id).delete()
    a.days.forEach(function(item){
      const assignment = new AssignmentCustomer()
      assignment.employee_id = a.employee_id
      assignment.customer_id = a.customer_id
      assignment.day = item
      assignment.save()
    })

    response.redirect('/assignment-customers')
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }

  async getRoutesWithoutSale({ auth }) {
    const userLogged = await auth.getUser()
    const user = await User.find(userLogged.id)
    const employee = await Employee.findBy('user_id', user.id)
    const day = moment().isoWeekday()

    const assignments = await Database.raw('call get_routes_without_sale(?, ?)',[day,employee.id])
    return assignments[0][0]
  }
}

module.exports = AssignmentCustomerController
