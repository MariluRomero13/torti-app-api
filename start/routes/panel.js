/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Login
Route.get('/', 'AuthController.showLoginForm').middleware(['authenticated'])
Route.post('/login-panel', 'AuthController.loginPanel').as('login-panel').validator('Login')
Route.post('/logout-panel', 'AuthController.logoutPanel').as('logout-panel')

// Home
Route.get('home', 'HomeController.index').as('home').middleware('auth:session')

//Products
Route.get('products', 'ProductController.index').as('products.index').middleware('auth:session')
Route.post('products', 'ProductController.store').as('products.store')
.validator('Product/StoreUpdateProduct').middleware('auth:session')
Route.get('products/create', 'ProductController.create').as('products.create').middleware('auth:session')
Route.get('products/:id', 'ProductController.show').as('products.show').middleware('auth:session')
Route.put('products/:id', 'ProductController.update').as('products.update')
.validator('Product/StoreUpdateProduct').middleware('auth:session')
Route.get('products/:id/edit', 'ProductController.edit').as('products.edit').middleware('auth:session')
Route.delete('products/:id', 'ProductController.destroy').as('users.destroy').middleware('auth:session')
<<<<<<< HEAD

//Roles
Route.get('roles', 'RoleController.index').as('roles.index').middleware('auth:session')
=======
Route.get('/:page?', 'ProductController.index').as('products.pagination')


>>>>>>> 671da76f54f46c567a5a17ce1cb332724630a6a8

