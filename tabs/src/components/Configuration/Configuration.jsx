import React , { useState } from 'react'
import { useData } from "@microsoft/teamsfx-react";

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

export default function Configuration({ apiClient }) {

    const [inputs, setInputs] = useState({});
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmitCurrency = async (event) => {
        event.preventDefault();
        const response = await apiClient.post("Currency", inputs);
        console.log("---------------", response);
    };

    const handleSubmitPersonnel = async (event) => {
        event.preventDefault();
        const response = await apiClient.post("Personnel", inputs);
        console.log("---------------", response);
    };

    const { CurrencyData } = useData(async () => {
        const response = await apiClient.get("Currency");
        return response.CurrencyData;
    });

    let Currency = { nodes: CurrencyData };
    const CurrencyTheme = useTheme(getTheme());

    const { PersonnelData } = useData(async () => {
        const response = await apiClient.get("Personnel");
        return response.PersonnelData;
    });

    let Personnel = { nodes: PersonnelData };
    const PersonnelTheme = useTheme(getTheme());


    return (
        <div className='container-fluid'>
            <Form>
                <Modal.Body>
                    <Tabs className='tab' defaultActiveKey="personnel">
                        <Tab eventKey="personnel" title="Personnel">
                            <Row>
                                <div class="row">
                                    <div class="col-4 mb-4 ">
                                        <div class="card">
                                            <h3 className=' card-header'>Personnel Form</h3>
                                            <div class="card-body">
                                                <Form onSubmit={handleSubmitPersonnel}>
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" name="ApprovalName" value={inputs.ApprovalName || ""} onChange={handleChange} placeholder="Approver Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="email">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" name="ApprovalEmail" value={inputs.ApprovalEmail || ""} onChange={handleChange} placeholder="name@example.com" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="role">
                                                        <Form.Label>Role</Form.Label>
                                                        <Form.Control type="text" name="Role" value={inputs.Role || ""} onChange={handleChange} placeholder="Approver Role" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="level">
                                                        <Form.Label>Level</Form.Label>
                                                        <Form.Control type="number" name="ApprovalLevel" value={inputs.ApprovalLevel || ""} onChange={handleChange} placeholder="Approver level" />
                                                    </Form.Group>
                                                </Form>

                                                <Button className='button float-right'>Add Record</Button>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="card">
                                            <h3 className=' card-header'>Personnel Record</h3>
                                            <div class="card-body">
                                                {PersonnelData && <div className="content-body">
                                                        <CompactTable
                                                            columns={[
                                                                { label: 'ID', renderCell: (item) => item?.id, resize: true },
                                                                { label: 'Name', renderCell: (item) => item?.ApprovalName, resize: true },
                                                                { label: 'Email', renderCell: (item) => item?.ApprovalEmail, resize: true },
                                                                { label: 'Role', renderCell: (item) => item?.Role, resize: true },
                                                            ]}
                                                            PersonnelData={Personnel}
                                                            PersonnelTheme={PersonnelTheme} />
                                                    </div>}
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
                                        <h3 className=' card-header'>Currency Form</h3>
                                        <div class="card-body">
                                            <Form onSubmit={handleSubmitCurrency}>
                                                <Form.Group className="mb-3" controlId="name">
                                                    <Form.Label>Currency Name</Form.Label>
                                                    <Form.Control type="text" name="CurrencyName" value={inputs.CurrencyName || ""} onChange={handleChange} placeholder="Currency Name" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="code">
                                                    <Form.Label>Currency Code</Form.Label>
                                                    <Form.Control type="text" name="CurrencyCode" value={inputs.CurrencyCode || ""} onChange={handleChange} placeholder="Currency Code" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="Symbol">
                                                    <Form.Label>Currency Symbol</Form.Label>
                                                    <Form.Control type="text" name="CurrencySymbol" value={inputs.CurrencySymbol || ""} onChange={handleChange} placeholder="Currency Symbol" />
                                                </Form.Group>
                                            </Form>

                                            <Button type="submit" onSubmit={handleSubmitCurrency} className='button float-right'>Add Record</Button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="card">
                                        <h3 className=' card-header'>Currency Record</h3>
                                        <div class="card-body">
                                            {CurrencyData && <div className="content-body">
                                                <CompactTable
                                                    columns={[
                                                        { label: 'ID', renderCell: (item) => item?.id, resize: true },
                                                        { label: 'Currency Name', renderCell: (item) => item?.CurrencyName, resize: true },
                                                        { label: 'Currency Code', renderCell: (item) => item?.CurrencyCode, resize: true },
                                                        { label: 'Currency Symbol', renderCell: (item) => item?.CurrencySymbol, resize: true },
                                                    ]}
                                                    CurrencyData={Currency}
                                                    CurrencyTheme={CurrencyTheme} />
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Form>

        </div>
    );
}

//export default Configuration