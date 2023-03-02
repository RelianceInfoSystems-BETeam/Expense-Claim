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

			<ul class='list-group mb-3 rounded-0'>
			<div className='row align-items-start'>
				<h6 className='col-3 fw-semibold'>Name</h6>
				<h6 className='col-3 fw-semibold'>Cost</h6>
				<h6 className='col-3 fw-semibold'>Status</h6>
				<h6 className='col-2 fw-semibold'>Date</h6>
			</div>
				{filteredExpenses.map((expense) => (
					<ExpenseItem
						id={expense.id}
						name={expense.name}
						cost={expense.cost}
						status={expense.status}
						date={expense.date}
					/>
				))}
			</ul>
		</div>
	);
};

export default ExpenseList;