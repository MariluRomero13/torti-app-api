'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employee')
const Role = use('App/Models/Role')
class EmployeeController {

  async index ({ view, params, request, response }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const employees = await Employee.query()
                                    .where('name', 'LIKE', '%' + search + '%')
                                    .orWhere('paternal', 'LIKE', '%' + search + '%')
                                    .orWhere('maternal', 'LIKE', '%' + search + '%')
                                    .paginate(page, 5)
    const pagination = employees.toJSON()
    pagination.route = 'employees.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('employees.index', { employees: pagination })
    }
  }

  async create ({ view }) {
    const roles = await Role.query().where('id', '!=', 1).fetch()
    return view.render('employees.create', { roles: roles.toJSON() })
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
    return view.render('employees.detail')
  }

  async edit ({ params, request, response, view }) {
    const roles = await Role.query().where('id', '!=', 1).fetch()
    return view.render('employees.edit', { roles: roles.toJSON() })
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = EmployeeController
