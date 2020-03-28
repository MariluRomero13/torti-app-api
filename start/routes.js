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
Route.get('/get-products', 'ProductController.getProducts')











// Login
Route.get('/', 'AuthController.showLoginForm').middleware(['authenticated'])
Route.post('/login-panel', 'AuthController.loginPanel').as('login-panel').validator('Login')
Route.post('/logout-panel', 'AuthController.logoutPanel').as('logout-panel')

// Home
Route.get('home', 'HomeController.index').as('home').middleware('auth:session')

// Employees
Route.get('employees', 'EmployeeController.index').as('employees.index').middleware('auth:session')
// Products
Route.post('products', 'ProductController.store').as('products.store')
.validator('Product/StoreUpdateProduct').middleware('auth:session')
Route.get('products/create', 'ProductController.create').as('products.create').middleware('auth:session')
Route.put('products/:id', 'ProductController.update').as('products.update')
.validator('Product/StoreUpdateProduct').middleware('auth:session')
Route.get('products/:id/edit', 'ProductController.edit').as('products.edit').middleware('auth:session')
// Route.get('products-page/:page?', 'ProductController.index').as('products.pagination')

//Roles
Route.get('roles', 'RoleController.index').as('roles.index').middleware('auth:session')
Route.get('/:page?', 'ProductController.index').as('products.pagination')
Route.get('roles/create','RoleController.create').as('roles.create').middleware('auth:session')
Route.post('roles', 'RolesController.store').as('roles.store')
.validator('Role/StoreUpdateRole').middleware('auth:session')

