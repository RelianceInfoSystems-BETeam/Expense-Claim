import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { v4 as uuidv4 } from 'uuid';

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

const AddExpenseForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		const expense = {
			id: uuidv4(),
			name,
			cost: parseInt(cost),
      date,
      status,
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});

		setName('');
		setCost('');
    setDate('');
    setStatus('Pending');
	};

	return (
		/*<form onSubmit={onSubmit}>
			<div class='row'>
				<div class='col-sm col-lg-4'>
					<label for='name'>Name</label>
					<input
						required='required'
						type='text'
						class='form-control'
						id='name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div class='col-sm col-lg-4'>
					<label for='cost'>Cost</label>
					<input
						required='required'
						type='number'
						class='form-control'
						id='cost'
						value={cost}
						onChange={(event) => setCost(event.target.value)}
					/>
				</div>
			</div>
			<div class='row mt-3'>
				<div class='col-sm'>
					<button type='submit' class='button'>
						Save
					</button>
				</div>
			</div>
		</form>*/
          <Form  onSubmit={onSubmit}>
            <Modal.Body>
              <Tabs className='tab' defaultActiveKey="basic">
                <Tab  eventKey="basic" title="Basic">
                  <br />
                  <Row>
				  <Form.Group as={Col} controlId="name">
                      <Form.Label>
                        <small>Expense Name </small>
                      </Form.Label>
                      <Form.Control
                        required='required'
                        name="name"
                        id='name'
						            value={name}
						            onChange={(event) => setName(event.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                       
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    
                    <Form.Group as={Col} controlId="paymentMethod">
                      <Form.Label>
                        <small>Payment Method</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="paymentMethod"
                        required='required'
                      >
                        <option></option>
                        <option value="CASH">CASH</option>
                        <option value="CARD">CARD</option>
                        <option value="ONLINE TRANSACTION">
                          ONLINE TRANSACTION
                        </option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        
                      </Form.Control.Feedback>
                    </Form.Group>

						
                    <Form.Group as={Col} controlId="date">
                      <Form.Label>
                        <small>Expense Entry Date </small>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        required='required'
                        placeholder="Expense Date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </Form.Group>

                    
                  </Row>

                 
                  
                  <Row>
				  <Form.Group as={Col} controlId="currency">
                      <Form.Label>
                        <small>Currency</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="currency"
                        required='required'
                      >
                        <option></option>
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="cost">
                      <Form.Label>
                        <small>Amount</small>
                      </Form.Label>
                      <Form.Control
                        required='required'
                        type='number'
                        name="cost"
                        id='cost'
						            value={cost}
						            onChange={(event) => setCost(event.target.value)}
                      />
                    </Form.Group>
                  </Row>
                </Tab>

                <Tab eventKey="description" title="Description">
                  <br />
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Control
                      as="textarea"
                      type="long-description"
                      name="description"
                      placeholder="Enter description of expense here"
                    />
                    <Form.Control.Feedback type="invalid">
                    </Form.Control.Feedback>{" "}
                  </Form.Group>
                </Tab>
                <Tab eventKey="attachment" title="Attachment">
                  <br />
                  <Form.Group className="mb-3" controlId="file">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Upload File (PDFs only)</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        accept=".pdf"
					/>
                      <Form.Control.Feedback type="invalid" tooltip>
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                  </Form.Group>
                </Tab>
              </Tabs>
            </Modal.Body>

            <Modal.Footer>
              <Button
                className ="button"
                type="submit"
               
              >
                Expense Entry
              </Button>
            </Modal.Footer>
          </Form>
	);
};

export default AddExpenseForm;
