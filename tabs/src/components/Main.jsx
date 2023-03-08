import React, { useState, useContext } from 'react';
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import Modal from 'react-bootstrap/Modal';
import { AppProvider } from './Context/AppContext';
import ExpenseTotal from './Expense/ExpenseTotal';
import ExpenseList from './Expense/ExpenseList';
import AddExpenseForm from './Expense/AddExpenseForm';
import Remaining from './Expense/Remaining';
import { FaMoneyBillWave, FaUserAlt , FaWallet} from 'react-icons/fa';


import './App.css';


function Main() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = (loading || error) ? "" : data.displayName;

  
  const teamsUserCredentials = useContext(TeamsFxContext).teamsUserCredential;
(async () => {const token = (await teamsUserCredentials.getToken("")).token;
console.log("....................", token) })()



  return (
    <AppProvider>
			<div className='container-fluid'>
        <div className=' card'>
            <h1 className='card-header d-flex justify-content-between'>My Expense Report 
              <button type='button' class='button' onClick={handleShow}>
                Add Expense Entry
              </button>
            </h1>
				<div className='card-body row '>
					
              <div class="col-4">
                    <div class="card">
                      <div class="card-content">
                        <div class="card-body">
                          <div class="media d-flex">
                            <div class="media-body text-left col-10">
                              <h3 class="">Welcome</h3>
                              <span>{userName ? " " + userName : ""}!</span>
                            </div>
                            <div class="align-self-center justify-content-end float-right d-flex">
                            <FaUserAlt className='icn'/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left col-10">
                        <h3 class=""><ExpenseTotal/></h3>
                        <span>Total Amount Spent</span>
                      </div>
                      <div class="align-self-center justify-content-end float-right ">
                      <FaMoneyBillWave className='icn'/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left col-10">
                        <h3 class=""><Remaining/></h3>
                        <span>Total Reimbursement</span>
                      </div>
                      <div class="align-self-center">
                      <FaWallet className='icn'/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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