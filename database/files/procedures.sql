# Este procedimiento me trae todas las rutas de un repartidor en un día en especifico con o sin pagos pendientes
DELIMITER $$
CREATE procedure get_routes_employee
(
	current_day int,
	employee int
)
begin
	select  c.id, c.name as customer, IF(t1.pendiente = 1, t1.pendiente, 0) as pending_payment from assignment_customers as ac
    inner join employees as e on e.id = ac.employee_id
	inner join customers as c on c.id = ac.customer_id left join (select c.id as customer_id, count(pp.id) as pendiente
	from customers as c inner join pending_payments as pp on pp.customer_id = c.id where pp.status = 1) as t1 on t1.customer_id = c.id
	where e.id = employee and ac.day = current_day;
end $$
DELIMITER $$

call get_routes_employee (1,1);

#Procedimiento que obtiene los clientes a los que ya se les realizó la venta por empleado y día
DELIMITER $$
CREATE procedure get_sales_history
(
	current_day int,
	employee int
)
begin
	select  c.id, c.name as customer, sum(sl.quantity * p.unit_price) as total from assignment_customers as ac
	inner join employees as e on e.id = ac.employee_id
	inner join customers as c on c.id = ac.customer_id
	inner join sales as s on s.customer_id = c.id
	inner join sale_details as sl on sl.sale_id = s.id
	inner join products as p on p.id = sl.product_id
	where e.id = employee and ac.day = current_day and date(s.created_at) = current_date()
	group by c.id;
end $$
DELIMITER $$

call get_sales_historial (1,1);

#Procedimiento que obtiene las rutas a las que no se les ha realizado una venta
DELIMITER $$
CREATE procedure get_routes_without_sale
(
	current_day int,
	employee int
)
begin
	select  distinct c.id, c.name as customer, IF(t1.pendiente = 1, t1.pendiente, 0) as pending_payment from assignment_customers as ac
	inner join employees as e on e.id = ac.employee_id
	inner join customers as c on c.id = ac.customer_id left join (select c.id as customer_id, count(pp.id) as pendiente
	from customers as c inner join pending_payments as pp on pp.customer_id = c.id where pp.status = 1) as t1 on t1.customer_id = c.id
	where c.id not in (select c.id as customer_id  from customers as c
	inner join assignment_customers as ac on ac.customer_id = c.id
	inner join sales as s on s.customer_id = c.id
	where ac.employee_id = employee and ac.day = current_day and date(s.created_at) = current_date());
end $$
DELIMITER $$

call get_routes_without_sale (1,1);


