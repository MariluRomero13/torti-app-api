'use strict'
const Encryption = use('Encryption')
class AuthController {
  showLoginForm ({ view }) {
    return view.render('auth.login')
  }

  async login ({ auth, response, request }) {
    const { username, password } = request.only(['username', 'password'])
    const token = await auth.query(query => {
      query.where('status', true)
    })
      .withRefreshToken()
      .attempt(username, password, true)

    return response.ok(token)
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
}

module.exports = AuthController
