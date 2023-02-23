import React from 'react'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

const Configuration = () => {
  return (
        <div className='container-fluid'>
            <Form >
            <Modal.Body>
              <Tabs className='tab' defaultActiveKey="personnel">
                <Tab  eventKey="personnel" title="Personnel">
                  <Row>
                        <div class="row">
                            <div class="col-4 mb-4 ">
                                <div class="card">
                                    <h3 className=' card-header'>Personnel Form</h3>
                                    <div class="card-body">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Approver Name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="role">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control type="text"  placeholder="Approver Role"  />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="level">
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control type="number"  placeholder="Approver level"  />
                                        </Form.Group>
                                    </Form>

                                    <Button className='button float-right' >Add Record</Button>

                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card">
                                    <h3 className=' card-header'>Personnel Record</h3>
                                    <div class="card-body">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                  </Row>
                </Tab>

                <Tab eventKey="currency" title="Currency">
                <div class="row">
                            <div class="col-4 mb-4 ">
                                <div class="card">
                                    <h3 className=' card-header'>Personnel Form</h3>
                                    <div class="card-body">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Currency Name</Form.Label>
                                            <Form.Control type="text" placeholder="Currency Name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="code">
                                            <Form.Label>Currency Code</Form.Label>
                                            <Form.Control type="code" placeholder="Currency Code" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="Symbol">
                                            <Form.Label>Currency Symbol</Form.Label>
                                            <Form.Control type="symbol"  placeholder="Currency Symbol"  />
                                        </Form.Group>
                                    </Form>

                                    <Button className='button float-right' >Add Record</Button>

                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card">
                                    <h3 className=' card-header'>Currency Record</h3>
                                    <div class="card-body">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                </Tab>
              </Tabs>
            </Modal.Body>
          </Form>

        </div>
  )
}

export default Configuration