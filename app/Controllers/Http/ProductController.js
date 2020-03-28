'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product')
class ProductController {
  async index ({ view, params, request, response }) {
    const page = params.page || 1
    const search = request.input('search') || ''
    const products = await Product.query()
                                    .where('name', 'LIKE', '%' + search + '%')
                                    .paginate(page, 5)
    const pagination = products.toJSON()
    pagination.route = 'products.pagination'
    if(pagination.lastPage < page && page != 1) {
      response.route(pagination.route, { page: 1 }, null, true)
    }
    else {
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.search = search
      return view.render('products.index', { products: pagination })
    }
  }

  async create ({ view }) {
    return view.render('products.create')
  }

  async store ({ request, response, session }) {
    const product = request.only(Product.store)
    try {
      await Product.create(product)
      return response.route('products.index')
    } catch (error) {
      session.flashOnly(['name', 'unit_price'])
      session.flash({
        notification: {
          type: 'danger',
          message: `Ocurrió un error, intentelo de nuevo`
        }
      })
      return response.redirect('back')
    }
  }

  async edit ({ params, request, response, view }) {
    const { id } = params
    const product = await Product.find(id)
    return view.render('products.edit', { product: product })
  }

  async update ({ params, request, response, session }) {
    try {
      const product = await Product.findOrFail(params.id)
      const productData = request.only(Product.update)
      product.merge(productData)
      await product.save()
      return response.route('products.index')
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

  async getProducts({ response }) {
    const products = await Product.all()
    return response.ok(products)
  }
}

module.exports = ProductController
