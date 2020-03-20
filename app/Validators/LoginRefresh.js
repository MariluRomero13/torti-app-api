'use strict'

class LoginRefresh {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      refresh_token: 'required'
    }
  }
}

module.exports = LoginRefresh
