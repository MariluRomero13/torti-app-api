/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// Login
Route.get('/', 'AuthController.showLoginForm').middleware(['authenticated'])
Route.post('/login-panel', 'AuthController.loginPanel').as('login-panel').validator('Login')
Route.post('/logout-panel', 'AuthController.logoutPanel').as('logout-panel')

// Home
Route.get('home', 'HomeController.index').as('home').middleware('auth:session')

//Customers
Route.get('customers-page/:page?', 'CustomerController.index').as('customers.pagination').middleware('auth:session')
Route.get('customers/create','CustomerController.create').as('customers.create').middleware('auth:session')
Route.post('customers', 'CustomerController.store').as('customers.store').validator('Customer/StoreUpdateCustomer').middleware('auth:session')
Route.get('/customers/:id/edit','CustomerController.edit').as('customers.edit')
Route.put('customers/:id','CustomerController.update').as('customers.update').validator('Customer/StoreUpdateCustomer')
Route.delete('/customers/delete/:id?','CustomerController.destroy').as('customers.delete')
Route.put('customers/location/:id','LocationController.updateOrCreate').as('locations.updateOrCreate').validator('Location/StoreUpdateLocation')
Route.get('/show-location/:id','CustomerController.show').as('customers.show')

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
Route.get('roles-page/:page?', 'RoleController.index').as('roles.pagination')
Route.get('roles/create','RoleController.create').as('roles.create').middleware('auth:session')
Route.post('roles', 'RoleController.store').as('roles.store')
.validator('Role/StoreUpdateRole').middleware('auth:session')
Route.get('roles/:id/edit', 'RoleController.edit').as('roles.edit').middleware('auth:session')
Route.put('roles/:id', 'RoleController.update').as('roles.update').validator('Role/StoreUpdateRole')
Route.delete('/roles/delete/:id?','RoleController.destroy').as('roles.delete')

// Sales
Route.get('sales-page/:page?', 'SaleController.index').as('sales.pagination').middleware('auth:session')
Route.get('sales/:id', 'SaleController.show').as('sales.show').middleware('auth:session')


//Assignment-customers
Route.get('/assignment-customers/:page?','AssignmentCustomerController.index').as('assignment-customers.pagination')
Route.post('assignment-customer','AssignmentCustomerController.store').as('assignment-customer.store')
// Payments
Route.get('payments-page/:page?', 'PendingPaymentController.index').as('payments.pagination').middleware('auth:session')
Route.get('getPayments/:id', 'PendingPaymentController.getPaymentDetail').as('payments.getPaymentDetail').middleware('auth:session')
