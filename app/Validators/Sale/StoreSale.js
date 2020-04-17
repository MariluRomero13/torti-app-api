'use strict'

class SaleStoreSale {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      customer_id: 'required',
      employee_id: 'required',
      details: 'array|required'
    }
  }
}

module.exports = SaleStoreSale
