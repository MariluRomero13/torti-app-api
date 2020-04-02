/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
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
Route.get('products-page/:page?', 'ProductController.index').as('products.pagination')

//Roles
Route.get('roles', 'RoleController.index').as('roles.index').middleware('auth:session')
Route.get('/:page?', 'ProductController.index').as('products.pagination')
Route.get('roles/create','RoleController.create').as('roles.create').middleware('auth:session')
Route.post('roles', 'RoleController.store').as('roles.store')
.validator('Role/StoreUpdateRole').middleware('auth:session')
<<<<<<< HEAD

Route.get('/roles/edit/:id','RolesController.edit').as('roles.edit')
Route.put('roles/update/:id','RolesController.update').as('roles.update')


Route.post('/roles/delete/:rol_id?','RolesController.delete').as('roles.delete')
Route.post('/roles/update/:rol_id?','RolesController.update').as('roles.update')

=======
>>>>>>> d41779967dea56b34f74da51cda6bd3adad2a749
