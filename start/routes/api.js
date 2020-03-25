/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'AuthController.login').validator('Login')
Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
  .validator('LoginRefresh')
Route.post('/logout', 'AuthController.logout')
  .validator('LoginRefresh')

Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly().only(['index'])
})
  .namespace('api')
  .middleware('auth:jwt')
