'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product')
class ProductController {
  async index ({ view }) {
    const products = await Product.all()
    return view.render('products.index', {products: products.toJSON()})
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ProductController
