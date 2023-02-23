import React, { useState } from 'react';
//import { Header } from './Expense/Header';
import Modal from 'react-bootstrap/Modal';
import { AppProvider } from './Context/AppContext';
import ExpenseTotal from './Expense/ExpenseTotal';
import ExpenseList from './Expense/ExpenseList';
import AddExpenseForm from './Expense/AddExpenseForm';
import Remaining from './Expense/Remaining';


import './App.css';

function Main() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AppProvider>
			<div className='container-fluid'>
        <div className=' card'>
            <h1 className='card-header d-flex justify-content-between'>My Expense Report 
              <button type='button' class='button' onClick={handleShow}>
                Add Expense Entry
              </button>
            </h1>
				<div className='card-body row mt-3'>
					<div className='col-sm'>
						
					</div>
					<div className='col-sm'>
						<ExpenseTotal />
					</div>
					<div className='col-sm'>
              <Remaining />
					</div>
				</div>
        </div>
        <div className='card'>
				<h3 className=' card-header'>Expenses</h3>
				<div className='card-body  row '>
					<div className='col-sm'>
						<ExpenseList />
					</div>
				</div>
        </div>
      
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Expense Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddExpenseForm/>
        </Modal.Body>
      </Modal>
  
		</AppProvider>
  );
}

export default Main;