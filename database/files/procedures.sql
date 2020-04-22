# Este procedimiento me trae todas las rutas de un repartidor en un día en especifico con o sin pagos pendientes

DELIMITER $$
CREATE procedure get_routes_employee
(
	current_day int,
	employee int
)
begin
	select  c.id, c.name as customer, IF(t1.pendiente = 1, t1.pendiente, 0) as pending_payment, t1.payment_id from assignment_customers as ac
    inner join employees as e on e.id = ac.employee_id
	inner join customers as c on c.id = ac.customer_id left join (select c.id as customer_id, count(pp.id) as pendiente, pp.id as payment_id
	from customers as c inner join pending_payments as pp on pp.customer_id = c.id where pp.status = 1) as t1 on t1.customer_id = c.id
	where e.id = employee and ac.day = current_day and ac.status = 1;
end $$
DELIMITER $$

call get_routes_employee (1,1);

/*DELIMITER $$
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
	where e.id = employee and ac.day = current_day and ac.status = 1;
end $$
DELIMITER $$

call get_routes_employee (1,1);*/

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
	where e.id = employee and ac.day = current_day and date(s.created_at) = current_date() and s.status = 1
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
	select  distinct c.id, c.name as customer, IF(t1.pendiente = 1, t1.pendiente, 0) as pending_payment, IF(t1.payment_id >= 1, t1.payment_id, 0) as payment_id from assignment_customers as ac
	inner join employees as e on e.id = ac.employee_id
	inner join customers as c on c.id = ac.customer_id left join (select c.id as customer_id, count(pp.id) as pendiente, pp.id as payment_id
	from customers as c inner join pending_payments as pp on pp.customer_id = c.id where pp.status = 1) as t1 on t1.customer_id = c.id
	where  ac.employee_id = employee and ac.day = current_day and c.id not in (select c.id as customer_id  from customers as c
	inner join assignment_customers as ac on ac.customer_id = c.id
	inner join sales as s on s.customer_id = c.id
	where ac.employee_id = employee and ac.day = current_day and date(s.created_at) = current_date() and ac.status = 1);
end $$
DELIMITER $$

call get_routes_without_sale (1,1);


#Procedimiento para obtener el total
DELIMITER $$
create procedure getTotal
(
  id int
)
begin
  select (sum(ppd.quantity * pro.unit_price)) as total, (sum(ppd.quantity * pro.unit_price) - pp.deposit) as to_pay,
  pp.deposit as deposit
  from customers as c inner join pending_payments as pp on c.id = pp.customer_id
  inner join pending_payment_details as ppd  on ppd.pending_payment_id = pp.id
  inner join products as pro on pro.id = ppd.product_id
  where pp.id = id and pp.status = 1;
end $$
DELIMITER $$

call getTotal (2)

-- este procedimiento regresa la informacion en para el customerassignment y puede recibir como parametro un nombre para buscarlo

DELIMITER //

	CREATE PROCEDURE get_assignments(IN search CHAR(50))
	BEGIN 
		SELECT assignments.assignment_id,
		assignments.customer_id,
		assignments.name,
		assignments.employee,
		assignments.address,
		GROUP_CONCAT(assignments.day) AS days
		from		
(SELECT 
		a_c.id AS assignment_id,
		cus.id AS customer_id,
		cus.name AS name,
		emp.name AS employee,
		cus.address AS address,
		a_c.day
		FROM customers AS cus
		left JOIN assignment_customers AS a_c	ON a_c.customer_id=cus.id
		left	JOIN employees AS emp  ON a_c.employee_id=emp.id
		WHERE cus.name LIKE CONCAT('%',search,'%'))AS assignments
		GROUP BY assignments.customer_id;	
	END//
	
DELIMITER ;

CALL get_assignments('')