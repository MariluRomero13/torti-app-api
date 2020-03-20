'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'AuthController.showLoginForm').middleware(['authenticated'])
Route.resource('/products', 'ProductController').middleware(['auth:panel'])
Route.resource('/home', 'HomeController').middleware(['auth:panel'])
Route.post('/login', 'AuthController.login').as('login').validator('Login')
// Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
//   .validator('LoginRefresh')
// Route.post('/logout', 'AuthController.logout')
//   .validator('LoginRefresh')
