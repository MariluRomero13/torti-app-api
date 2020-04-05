'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employee')
const Role = use('App/Models/Role')
const User = use('App/Models/User')
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

  async store ({ request, response, session }) {
   try {
    const userData = request.only(User.store)
    const user = await User.create(userData)
    const employee = request.only(Employee.store)
    employee.user_id = user.id
    await Employee.create(employee)
    return response.route('employees.pagination')
   } catch (error) {
    session.flashOnly(['username', 'password', 'role_id', 'maternal',
      'paternal', 'name', 'phone', 'address'])
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
    const employee = await Employee.query().where('id', params.id).with('user.role').fetch()
    return view.render('employees.detail', { employee: employee.toJSON() })
  }

  async edit ({ params, view }) {
    const { id } = params
    const employee = await Employee.query().where('id', id).with('user').fetch()
    return view.render('employees.edit', { employee: employee.toJSON() })
  }

  async update ({ params, request, response }) {
    try {
      const employee = await Employee.findOrFail(params.id)
      const employeeData = request.only(Employee.update)
      const user = await User.findOrFail(employee.user_id)
      const { username, status, password } = request.only(['username','password', 'status'])
      employee.merge(employeeData)
      await employee.save()
      if (password !== null) {
        user.password = password
      }
      user.username = username
      user.status = status
      await user.save()
      return response.route('employees.pagination')
    } catch (error) {
      session.flashOnly(['username', 'password', 'maternal',
      'paternal', 'name', 'phone', 'address', 'status'])
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
  }
}

module.exports = EmployeeController
