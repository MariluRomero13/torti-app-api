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
Route.get('routes-by-employee', 'AuthController.getRoutesByEmployee').middleware('auth:jwt')

// Sales
Route.get('get-sales-history', 'SaleController.getSalesHistory').middleware('auth:jwt')
Route.post('/save-sale', 'SaleController.store').middleware('auth:jwt')
Route.get('/sale-details/:id', 'SaleController.getSaleDetail').middleware('auth:jwt')

//Location
Route.get('customer-location/:id', 'LocationController.show')

// Pending payments
Route.post('/save-pending-payment', 'PendingPaymentController.store').middleware('auth:jwt')
Route.get('/get-pending-payment/:id', 'PendingPaymentController.show').middleware('auth:jwt')
Route.post('/set-deposit', 'PendingPaymentController.setDeposit').middleware('auth:jwt')
// Status en el método de setDeposit
/**
 * 0 -> EL déposito fue hecho con éxito pero el pago pendiente no se ha terminado de pagar
 * 2 -> El déposito es más grande que el total a pagar
 * 1 -> El pago pendiente quedó liquidado y el cliente ya no debe nada, esto se pasa a la tabla de sales
 */

require('./routes/panel')
