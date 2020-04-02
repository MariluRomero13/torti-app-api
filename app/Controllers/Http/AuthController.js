'use strict'
const Encryption = use('Encryption')
const moment = require('moment');
const User = use('App/Models/User')
const Employee = use('App/Models/Employee')
const Database = use('Database')
class AuthController {
  showLoginForm ({ view }) {
    return view.render('auth.login')
  }

  async login ({ auth, response, request }) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.findBy('username', username)
    const token = await auth.query(query => {
      query.where('status', true)
    })
    .withRefreshToken()
    .attempt(username, password, true)
    const assignments = await this.getRoutesByEmployee(user.id)
    return response.ok({ token: token, assignments: assignments })
  }

  async loginPanel ({ auth, response, request, session }) {
    const { username, password } = request.only(['username', 'password'])
    try {
      await auth.authenticator('panel').attempt(username, password, true)
      return response.route('home')
    } catch (error) {
      session.flashOnly(['username', 'password'])
      session.flash({
        notification: {
          type: 'danger',
          message: `Correo y/o contraseña son incorrectos`
        }
      })
      return response.redirect('back')
    }
  }

  async generateTokenWithRefresh ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.newRefreshToken()
      .generateForRefreshToken(refreshToken, true)
    return response.ok(token)
  }

  async logout ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const decryptedToken = Encryption.decrypt(refreshToken)
    const user = await auth.getUser()
      await user.tokens()
        .where('token', decryptedToken)
        .delete()

    return response.ok({
      success: true,
      message: 'Logged out successfully!',
      data: {}
    })
  }

  async logoutPanel ({ auth, response }) {
    this.removeCookies(response)
    return response.redirect('/')

  }

  removeCookies(response) {
    response.clearCookie('adonis-session-values')
    response.clearCookie('adonis-session')
    response.clearCookie('pga4_session')
    response.clearCookie('PGADMIN_KEY')
    response.clearCookie('XSRF-TOKEN')
    response.clearCookie('PGADMIN_LANGUAGE')
  }

  async getRoutesByEmployee(userLogged) {
    const user = await User.find(userLogged)
    const employee = await Employee.findBy('user_id', user.id)
    const day = moment().isoWeekday()
    const assignments = await Database.raw('call get_routes_employee(?, ?)',[day,employee.id])
    return assignments[0][0]
  }
}

module.exports = AuthController
