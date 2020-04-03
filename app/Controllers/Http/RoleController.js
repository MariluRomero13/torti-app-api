'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with roles
 */
const Role = use('App/Models/Role')
class RoleController {

  async index ({ request, response, view }) {
    const roles = await Role.all()
    return view.render('roles.index', { roles: roles.toJSON() })
  }


  async create ({ request, response, view }) {
    return view.render('roles.create')
  }


  async store ({ request, response }) {
    const rol = request.only(Role.store)
    try {
      await Role.create(rol)
      return response.route('roles.index')
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
    const rol = await Role.find(params.id)
    return view.render('roles.edit',{
      rol
    })
    
  }


  async update ({ params, request, response }) {
    const rol = await Role.find(params.id)
    rol.name = request.input('name')

    await rol.save()

    return response.redirect('/roles')
  }

  async destroy ({ params, request, response }) {
    const rol = await Role.find(params.id)
    await rol.delete()
    return response.redirect('/roles')
  }
}

module.exports = RoleController
