'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with roles
 */
const Role = use('App/Models/Role')
class RoleController {

  async index ({ view, params, request, response }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const roles = await Role.query()
                                    .where('name', 'LIKE', '%' + search + '%')
                                    .paginate(page, 5)
    const pagination = roles.toJSON()
    pagination.route = 'roles.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('roles.index', { roles: pagination })
    }
  }


  async create ({ request, response, view }) {
    return view.render('roles.create')
  }


  async store ({ request, response }) {
    const rol = request.only(Role.store)
    try {
      await Role.create(rol)
      return response.route('roles.pagination')
    } catch (error) {
      session.flashOnly(['name'])
      session.flash({
        notification: {
          type: 'danger',
          message: `Ocurrió un error, intentelo de nuevo`
        }
      })
      return response.redirect('back')
    }
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
    const role = await Role.find(params.id)
    return view.render('roles.edit', { role: role.toJSON() })
  }

  async update ({ params, request, response }) {
    const role = await Role.find(params.id)
    role.name = request.input('name')
    await role.save()
    return response.route('roles.pagination')
  }

  async destroy ({ params, request, response }) {
    const rol = await Role.find(params.id)
    await rol.delete()
    return response.redirect('/roles')
  }
}

module.exports = RoleController
