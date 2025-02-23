
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import "./service.css";
import CreateServices from './service.create';
import EditServices from './service.edit';
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetail = () => {
    const { id } = useParams();
    console.log("check id", id);
    const [listService, setListService] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [dropdownSelected, setDropdownSelected] = useState("");
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listCustomer, setListCustomer] = useState([]);
    const navigation = useNavigate()

    useEffect(() => {
        getData();
        fetchListCustomer();
    }, [])

    const fetchListCustomer = async () => {
        const res = await axios.get(`http://localhost:3001/customers`)
        console.log(">>>check res", res);
        if (!res) {
            toast.error("error fetch data")
        }
        setListCustomer(res.data)
    }
    const getData = async () => {
        const res = await axios.get("http://localhost:3001/services", {
            params: {
                customer: id,
            }
        });
        if (!res) {
            toast.error("error fetch data")
        }
        setListService(res.data)
    }
    const handleSave = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='container'>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"

            }}>
                <h2 style={{
                    marginBottom: "20px",
                    color: "red",
                    marginTop: "10px"
                }}>Dịch vụ</h2>
                <Button

                    onClick={() => navigation("/services")}

                >
                    Quay lại trang dịch vụ
                </Button>
            </div>


            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên dịch vụ</th>
                        <th>Tháng Năm</th>
                        <th>Khách hàng</th>
                        <th>Tiêu thụ</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>

                    </tr>
                </thead>
                <tbody>
                    {listService.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item?.type?.name}</td>
                                <td>{item.date}</td>
                                <td>{listCustomer.find((i) => i.id === item.customer)?.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item?.type?.price}</td>
                                <td>{item?.type?.price * item.quantity}</td>
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
                                    <p>Thanh toán số tiền: {selectedService.consume * selectedService.quantity} VND</p>
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
                <CreateServices isOpenModalCreate={isOpenModalCreate} setIsOpenModalCreate={setIsOpenModalCreate} getData={getData} />
            )}

            {
                isOpenModalEdit && (
                    <EditServices
                        getData={getData}
                        dataUpdate={dataUpdate}
                        setDataUpdate={setDataUpdate}
                        isOpenModalEdit={isOpenModalEdit}
                        setIsOpenModalEdit={setIsOpenModalEdit} />
                )
            }
        </div>

    );
};

export default ServiceDetail;