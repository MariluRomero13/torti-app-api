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
.validator('Products/StoreUpdateProduct').middleware('auth:session')
Route.get('products/create', 'ProductController.create').as('products.create').middleware('auth:session')
Route.get('products/:id', 'ProductController.show').as('products.show').middleware('auth:session')
Route.put('products/:id', 'ProductController.update').as('products.update')
.validator('Products/StoreUpdateProduct').middleware('auth:session')
Route.get('products/:id/edit', 'ProductController.edit').as('products.edit').middleware('auth:session')
Route.delete('products/:id', 'ProductController.destroy').as('users.destroy').middleware('auth:session')




