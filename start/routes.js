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
Route.post('/login', 'AuthController.login').validator('Login')
Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
  .validator('LoginRefresh')
Route.post('/logout', 'AuthController.logout')
  .validator('LoginRefresh')
Route.get('/get-products', 'ProductController.getProducts').middleware('auth:jwt')

//Assignments
Route.get('get-routes-without-sale', 'AssignmentCustomerController.getRoutesWithoutSale').middleware('auth:jwt')

// Sales
Route.get('get-sales-history', 'SaleController.getSalesHistory').middleware('auth:jwt')

//Location
Route.post('save-customer-location', 'LocationController.store').middleware('auth:jwt')
Route.get('customer-location/:id', 'LocationController.show').middleware('auth:jwt')
Route.put('update-customer-location/:id', 'LocationController.update').middleware('auth:jwt')


require('./routes/panel')
