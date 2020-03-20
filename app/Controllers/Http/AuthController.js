'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  showLoginForm ({ view }) {
    return view.render('auth.login')
  }

  async login ({ auth, response, request, session }) {
    const { username, password, status } = request.only(['username', 'password', 'status'])
    if (parseInt(status)) {
      const token = await auth.query(query => {
        query.where('status', true)
      })
        .withRefreshToken()
        .attempt(username, password, true)
      return response.ok(token)
    } else {
      try {
        await auth.authenticator('panel').attempt(username, password, true)
        return response.route('home')
      } catch (error) {
        session.flash({
          notification: {
            type: 'danger',
            message: `We couldn't verify your credentials. Make sure you've confirmed your email address.`
          }
        })
        return response.redirect('back')
      }
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
}

module.exports = AuthController
