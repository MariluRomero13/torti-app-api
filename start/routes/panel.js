/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// Login
Route.get('/', 'AuthController.showLoginForm').middleware(['authenticated'])
Route.post('/login-panel', 'AuthController.loginPanel').as('login-panel').validator('Login')
Route.post('/logout-panel', 'AuthController.logoutPanel').as('logout-panel')

// Home
Route.get('home', 'HomeController.index').as('home').middleware('auth:session')


//Customers
Route.get('customers','CustomerController.index').as('customers.index').middleware('auth:session')
Route.get('customers/create','CustomerController.create').as('customers.create').middleware('auth:session')
Route.post('customers', 'CustomerController.store').as('customers.store').validator('Customer/StoreUpdateCustomer').middleware('auth:session')
Route.get('/customers/edit/:id','CustomerController.edit').as('customers.edit')
Route.put('customers/:id','CustomerController.update').as('customers.update').validator('Customer/StoreUpdateCustomer')
Route.delete('/customers/delete/:id?','CustomerController.destroy').as('customers.delete')
//Route.post('/customers/update/:rol_id?','CustomerController.update').as('customers.update')



// Employees
Route.get('employees-page/:page?', 'EmployeeController.index').as('employees.pagination')
Route.get('employees/create', 'EmployeeController.create').as('employees.create').middleware('auth:session')
Route.get('employees/:id/edit', 'EmployeeController.edit').as('employees.edit').middleware('auth:session')
Route.get('employees/:id', 'EmployeeController.show').as('employees.show').middleware('auth:session')
Route.post('employees', 'EmployeeController.store').as('employees.store')
.validator('Employee/StoreEmployee').middleware('auth:session')
Route.put('employees/:id', 'EmployeeController.update').as('employees.update')
.validator('Employee/UpdateEmployee').middleware('auth:session')

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
Route.get('roles/create','RoleController.create').as('roles.create').middleware('auth:session')
Route.post('roles', 'RoleController.store').as('roles.store')
.validator('Role/StoreUpdateRole').middleware('auth:session')
Route.get('/roles/edit/:id','RoleController.edit').as('roles.edit')
Route.put('roles/update/:id','RoleController.update').as('roles.update').validator('Role/StoreUpdateRole')
Route.delete('/roles/delete/:id?','RoleController.destroy').as('roles.delete')
//Route.post('/roles/update/:rol_id?','RoleController.update').as('roles.update')

// Sales
Route.get('sales-page/:page?', 'SaleController.index').as('sales.pagination')
Route.get('sales/:id', 'SaleController.show').as('sales.show').middleware('auth:session')
