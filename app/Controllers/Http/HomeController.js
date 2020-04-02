'use strict'
const User = use('App/Models/User')
const Customer = use('App/Models/Customer')
const Sale = use('App/Models/Sale')
var moment = require('moment');
class HomeController {
  async index({ view }) {
    const actualDate = moment().format('YYYY/MM/DD')
    const users = await User.query().where('role_id', '=', 2).getCount()
    const customers = await Customer.query().getCount()
    const sales = await Sale.all()
    const salesParsed = sales.toJSON()
    let salesCounter = 0
    for (const sale of salesParsed) {
      if (moment(sale.created_at).format('YYYY/MM/DD') === actualDate) {
        salesCounter++
      }
    }
    return view.render('home', { customers, users, salesCounter })
  }
}

module.exports = HomeController
