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
class AssignmentCustomerController {
  /**
   * Show a list of all assignmentcustomers.
   * GET assignmentcustomers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new assignmentcustomer.
   * GET assignmentcustomers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new assignmentcustomer.
   * POST assignmentcustomers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single assignmentcustomer.
   * GET assignmentcustomers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing assignmentcustomer.
   * GET assignmentcustomers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update assignmentcustomer details.
   * PUT or PATCH assignmentcustomers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a assignmentcustomer with id.
   * DELETE assignmentcustomers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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
