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
    return view.render('products.index', { products: products.toJSON() })
  }

  async create ({ view }) {
    return view.render('products.create')
  }

  async store ({ request, response }) {
    const product = request.only(Product.store)
    await Product.create(product)
    session.flash({
      notification: {
        type: 'success',
        message: `Producto agregado correctamente`
      }
    })
    return response.redirect('back')
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
