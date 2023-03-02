import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const ExpenseTotal = () => {
	const { expenses } = useContext(AppContext);

	const total = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	return (
		<div >
			<span> £{total}</span>
		</div>
	);
};

export default ExpenseTotal;
