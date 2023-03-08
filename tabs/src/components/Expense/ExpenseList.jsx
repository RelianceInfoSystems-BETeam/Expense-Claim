import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../Context/AppContext';
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;


const ExpenseList = () => {
	const { expenses } = useContext(AppContext);

	const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

	useEffect(() => {
		setfilteredExpenses(expenses);
	}, [expenses]);

	const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.name.toLowerCase().includes(event.target.value)
		);
		setfilteredExpenses(searchResults);
	};

	const [dates, setDates] = useState([])
	console.log(dates)
  

	

	return (
		<div>
		<div className="filter-container mt-0 row mb-4 justify-content-end">
			<div className='row input-group w-100'>
				<div className="col-1"></div>
				<select
					className='col-3 w-10'
					name="expense-status"
					id="expense-status"
				>
					<option value="">All</option>
					<option value="Pending">Pending</option>
					<option value="Approved">Approved</option>
					<option value="Rejected">Rejected</option>
				</select>
				<div className="col-1"></div>
				< RangePicker
					className='col-4'
					onChange={(values) => {
					setDates(values.map(item=>{
						return  moment(item).format('DD-MMM-YYYY')
					}))
					}}
				/>
				<div className="col-1"></div>
				<input
					type='text'
					className='col-4  form-control form-control-sm'
					placeholder='Type to search...'
					onChange={handleChange}
				/>
			</div>
		</div>

			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Item</th>
						<th>Cost</th>
						<th>Status</th>
						<th> Date (Days)</th>
					</tr>
				</thead>
						{filteredExpenses.map((expense, key) => {
							return(
							<tbody>
								<tr key={ExpenseItem}>
									<td>{expense.id}</td>
									<td>{expense.name}</td>
									<td>{expense.cost}</td>
									<td>{expense.status}</td>
									<td>{expense.date}</td>
									</tr>
									</tbody>
									) 
								}
								)
							}
			</table>
		</div>
	);
};

export default ExpenseList;