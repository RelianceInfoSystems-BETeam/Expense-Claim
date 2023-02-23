import React, { useContext } from 'react';
//import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../Context/AppContext';

const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

	return (
		<li class='list-group-item d-flex justify-content-between align-items-center'>
			<span class='col-sm-3'>{props.name}</span>
			<span class='col-sm-3'>£{props.cost}</span>
			<span class='col-sm-3'>{props.status}</span>
			<span class='col-sm-2'>{props.date}</span>
			<div>
				
				<button class='button-delete' onClick={handleDeleteExpense}>Delete<span class="bi bi-trash" size='0,5em' onClick={handleDeleteExpense}> </span></button>
			</div>
		</li>
	);
};

export default ExpenseItem;
