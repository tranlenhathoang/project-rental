import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import "./service.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CreateServices from './service.create';


const listPremises = [
    {
        id: 1,
        name: "MB001",
    },
    {
        id: 2,
        name: "MB002",
    },
    {
        id: 3,
        name: "MB003",
    }
];


const ServiceTable = () => {

    const [listService, setListService] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [dropdownSelected, setDropdownSelected] = useState("");
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);


    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        const res = await axios.get(`http://localhost:3001/services?premises=${dropdownSelected}`)
        console.log(">>>check res", res);
        if (!res) {
            toast.error("error fetch data")
        }
        setListService(res.data)

    }
    console.log(listService);

    const handlePayment = (item) => {
        setIsModalOpen(true);
        setSelectedService(item);
    }

    const handleSave = () => {
        // logic thanh toán dịch vụ là delete => call api delete + close modal
        setIsModalOpen(false)
    }

    const handleSelect = (item) => {
        setDropdownSelected(item.name);
    }
    console.log(dropdownSelected);

    const handleSearch = () => {
        getData();
    }





    return (
        <div className='container'>
            <h2 style={{
                marginBottom: "20px"
            }}>Dịch vụ</h2>
            <div className="row mb-5">
                <div className="col d-flex align-items-center gap-3">
                    <span className='title'>Mặt Bằng: </span>
                    <div>
                        <DropdownButton id="dropdown-basic-button" title={dropdownSelected || "Chọn mặt bằng"} >
                            {listPremises.map(item => {
                                return (
                                    <Dropdown.Item key={item.id} onClick={() => handleSelect(item)}>{item.name}</Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </div>

                </div>
                <div className="col">
                    <span className='title'>Tên khách hàng: </span>
                    <input type="text" className='input' />
                    <Button variant="primary" style={{
                        marginRight: "10px"
                    }} onClick={() => handleSearch()}>Tìm kiếm</Button>
                    <Button variant="secondary" onClick={() => setIsOpenModalCreate(true)}>Thêm dịch vụ</Button>
                </div>

            </div>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên dịch vụ</th>
                        <th>Tháng Năm</th>
                        <th>Chỉ số tháng trước</th>
                        <th>Chỉ số tháng sau</th>
                        <th>Đơn vị</th>
                        <th>Tiêu thụ</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {listService.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.prevMonth}</td>
                                <td>{item.nextMonth}</td>
                                <td>{item.unit}</td>
                                <td>{item.nextMonth - item.prevMonth}</td>
                                <td>{item.consume}</td>
                                <td>{item.consume * (item.nextMonth - item.prevMonth)}</td>
                                <td><Button onClick={() => handlePayment(item)}>Thanh toán</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {
                isModalOpen && (
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'static', }}
                    >
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Thanh Toán</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {selectedService && (
                                    <p>Thanh toán số tiền: {selectedService.consume * (selectedService.nextMonth - selectedService.prevMonth)} VND</p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
                                <Button variant="primary" onClick={() => handleSave()}>Save changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                )
            }

            {isOpenModalCreate && (
                <CreateServices isOpenModalCreate={isOpenModalCreate} setIsOpenModalCreate={setIsOpenModalCreate} />
            )}




        </div>

    );
};

export default ServiceTable;