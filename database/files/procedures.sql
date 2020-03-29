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







