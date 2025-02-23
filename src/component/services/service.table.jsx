import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import "./service.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CreateServices from "./service.create";
import EditServices from "./service.edit";
import ReactPaginate from "react-paginate";

const ServiceTable = () => {
	const [listService, setListService] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedService, setSelectedService] = useState(null);
	const [dropdownSelected, setDropdownSelected] = useState("");
	const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
	const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
	const [dataUpdate, setDataUpdate] = useState(null);
	const [listCustomer, setListCustomer] = useState([]);
	const [listPremises, setListPremises] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 3;

	useEffect(() => {
		getData();
		fetchListCustomer();
		fetchListPremises();
	}, []);




	const fetchListCustomer = async () => {
		const res = await axios.get(`http://localhost:3001/customers`);
		if (!res) {
			toast.error("error fetch data");
		}
		setListCustomer(res.data);
	};

	const fetchListPremises = async () => {
		const res = await axios.get(`http://localhost:3001/premises`);
		if (!res) {
			toast.error("error fetch data");
		}
		setListPremises(res.data);
	};

	const getData = async () => {
		const params = {};
		if (dropdownSelected) {
			params.premises = dropdownSelected;
		}



		const res = await axios.get("http://localhost:3001/services", { params });

		if (!res) {
			toast.error("error fetch data");
		}
		setListService(res.data);
	};

	const handleSave = async () => {
		const res = await axios.delete(`http://localhost:3001/services/${selectedService.id}`);
		if (res.status === 200) {
			toast.success("Xóa dịch vụ thành công!");
			getData();
		} else {
			toast.error("Xóa dịch vụ thất bại");
		}
		setIsModalOpen(false);
	};

	const handleSelect = (item) => {
		setDropdownSelected(item.premisesName);
	};

	const handleSearch = () => {
		getData();
	};

	const handlePayment = (item) => {
		setIsModalOpen(true);
		setSelectedService(item);
	};

	// vừa vào thì currentPage =  0 => offset = 0
	const offset = currentPage * itemsPerPage;
	// currentItems chạy từ 0 đến itemsPerPage - 1
	const currentItems = listService.slice(offset, offset + itemsPerPage);
	const pageCount = Math.ceil(listService.length / itemsPerPage);

	// selected => trang hiện tại đầu tiên là 1 => selected = 0
	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected);
		console.log(selected);
	};

	return (
		<div className="container">
			<div className="text-center mb-5">
				<h2>DANH SÁCH DỊCH VỤ</h2>
			</div>
			<div className="row mb-5">
				<div className="col d-flex align-items-center gap-3">
					<span className="title" style={{ fontWeight: "500" }}>
						Mặt Bằng:{" "}
					</span>
					<div>
						<DropdownButton id="dropdown-basic-button" title={dropdownSelected || "Chọn mặt bằng"}>
							{listPremises.map((item) => {
								return (
									<Dropdown.Item key={item.id} onClick={() => handleSelect(item)}>
										{item.premisesName}
									</Dropdown.Item>
								);
							})}
						</DropdownButton>
					</div>
				</div>
				<div className="col">
					<Button
						style={{
							marginRight: "10px",
							backgroundColor: "#FFC107",
						}}
						onClick={() => handleSearch()}
					>
						Tìm kiếm
					</Button>
					<Button
						style={{
							backgroundColor: "#198754",
						}}
						onClick={() => setIsOpenModalCreate(true)}
					>
						Thêm dịch vụ
					</Button>
				</div>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Tên dịch vụ</th>
						<th>Tháng Năm</th>
						<th>Khách hàng</th>
						<th>Tiêu thụ</th>
						<th>Đơn giá</th>
						<th>Thành tiền</th>
						<th>Thanh toán</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((item, index) => {
						return (
							<tr key={item.id}>
								<td>{index + 1 + offset}</td>
								<td>{item?.type?.name}</td>
								<td>{item.date}</td>
								<td>{listCustomer.find((i) => i.id === item.customer)?.name}</td>
								<td>{item.quantity}</td>
								<td>{item?.type?.price}</td>
								<td>{item?.type?.price * item.quantity}</td>
								<td
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<Button onClick={() => handlePayment(item)}>Thanh toán</Button>
									<Button
										variant="secondary"
										onClick={() => {
											setIsOpenModalEdit(true);
											setDataUpdate(item);
										}}
									>
										Chỉnh sửa
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			{isModalOpen && (
				<div className="modal show" style={{ display: "block" }}>
					<Modal.Dialog>
						<Modal.Header>
							<Modal.Title>Thanh Toán</Modal.Title>
						</Modal.Header>

						<Modal.Body>{selectedService && <p>Thanh toán số tiền: {selectedService?.type?.price * selectedService.quantity} VND</p>}</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
								Hủy
							</Button>
							<Button variant="primary" onClick={() => handleSave()}>
								Đồng ý
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</div>
			)}

			{isOpenModalCreate && <CreateServices
				isOpenModalCreate={isOpenModalCreate}
				setIsOpenModalCreate={setIsOpenModalCreate}
				getData={getData} />}

			{isOpenModalEdit && (
				<EditServices
					getData={getData}
					dataUpdate={dataUpdate}
					setDataUpdate={setDataUpdate}
					isOpenModalEdit={isOpenModalEdit}
					setIsOpenModalEdit={setIsOpenModalEdit}
				/>
			)}

			<ReactPaginate
				previousLabel={<span className="page">Trang đầu</span>}
				nextLabel={<span className="page">Trang cuối</span>}
				breakLabel={<span className="page-link">...</span>}
				pageCount={pageCount}
				onPageChange={handlePageClick}
				containerClassName="pagination container my-4 d-flex justify-content-center"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				activeClassName="active"
				disabledClassName="disabled"
			/>
		</div>
	);
};

export default ServiceTable;
