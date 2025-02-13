import React, { useEffect, useRef, useState } from "react";
import CustomerItem from "./CustomerItem";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { HiArrowPath } from "react-icons/hi2";
import { PAGE_SIZE } from "../apiProject/constant";
import { getAllCustomer, searchByName } from "../apiProject/customerService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteComponent from "./DeleteComponent";
import styles from "./Customer.module.css";

function CustomerList() {
	const [customerList, setCustomerList] = useState([]);
	const [show, setShow] = useState(false);
	const [deleteCustomer, setDeleteCustomer] = useState({});
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const [data, totalRecords] = await getAllCustomer(page, totalSize);
			setCustomerList(data);
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [page, reload, show]);

	const reloadData = () => {
		setReload(!reload);
	};
	const searchNameRef = useRef();
	const searchIdentityRef = useRef();
	const searchPhoneRef = useRef();
	const handleSearch = async () => {
		let searchName = searchNameRef.current.value.trim();
		let searchPhone = searchPhoneRef.current.value.trim();
		let searchIdentity = searchIdentityRef.current.value.trim();
		const [data, totalRecords] = await searchByName(searchName, searchIdentity, searchPhone, page, PAGE_SIZE);
		setCustomerList(() => [...data]);
		setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
	};
	//sau khi search thì phải cập nhật lại giao diện phân trang
	const handleFirst = () => {
		setPage(1);
	};
	const handlePrev = () => {
		setPage(page - 1);
	};
	const handleNext = () => {
		setPage(page + 1);
	};
	const handleLast = () => {
		setPage(totalPage);
	};

	const showModalDelete = (customer) => {
		setDeleteCustomer(customer);
		setShow(true);
	};

	const closeModal = () => {
		setShow(false);
	};

	return (
		<div>
			<div className="container my-3">
				<div className="text-center mb-5">
					<h2>DANH SÁCH KHÁCH HÀNG</h2>
				</div>
				<Row className="g-4 align-items-center">
					<Col xs="auto">
						<div className="d-flex align-items-center">
							<input
								ref={searchNameRef}
								type="text"
								id="customerName"
								className="form-control"
								style={{ width: "250px" }}
								placeholder="Tên khách hàng"
							/>
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex align-items-center">
							<input
								ref={searchIdentityRef}
								type="text"
								id="customerID"
								className="form-control"
								style={{ width: "250px" }}
								placeholder="Số chứng minh nhân dân"
							/>
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex align-items-center">
							<input
								ref={searchPhoneRef}
								type="text"
								id="customerPhone"
								className="form-control"
								style={{ width: "250px" }}
								placeholder="Số điện thoại"
							/>
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex">
							<button
								onClick={handleSearch}
								type="button"
								className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
								style={{ width: "40px", height: "40px" }}
							>
								<FaSearch color="red" size={20} />
							</button>
							<button
								type="button"
								className="btn btn-secondary rounded-circle ms-2 d-flex justify-content-center align-items-center"
								style={{ width: "40px", height: "40px" }}
								onClick={reloadData}
							>
								<HiArrowPath style={{ width: "20px", height: "20px" }} />
							</button>
						</div>
					</Col>
				</Row>
			</div>

			<div className="container" id={styles.list}>
				<div className="d-flex justify-content-start align-items-center gap-2 mb-3">
					<Link className="btn btn-success" to="/add_customers">
						Thêm mới
					</Link>
				</div>

				<table className="table table-light table-bordered table-striped">
					<thead>
						<tr className={styles.tableHeader}>
							<th className="text-center" style={{ width: "40px" }}>
								STT
							</th>
							<th className="text-center">Họ Tên</th>
							<th className="text-center">CMND</th>
							<th className="text-center">Email</th>
							<th className="text-center">Số điện thoại</th>
							<th className="text-center" style={{ width: 200 }}>
								Khách hàng
							</th>
							<th className="text-center" style={{ width: 200 }}>
								Mặt bằng
							</th>
							<th colSpan={2}></th>
						</tr>
					</thead>
					<tbody>
						{customerList.length === 0 ? (
							<tr>
								<td colSpan="7" className="text-center">
									Không có dữ liệu
								</td>
							</tr>
						) : (
							customerList.map((c, i) => <CustomerItem key={c.id} customer={c} i={(page - 1) * PAGE_SIZE + i} showModalDelete={showModalDelete} />)
						)}
					</tbody>
				</table>
				<DeleteComponent customer={deleteCustomer} show={show} closeModal={closeModal} />
			</div>
			<Pagination className="container my-4 d-flex justify-content-center" id="pagination">
				<Pagination.First onClick={handleFirst} disabled={page === 1}>
					Trang đầu
				</Pagination.First>
				<Pagination.Prev onClick={handlePrev} disabled={page === 1} />
				{[...Array(totalPage || 0)].map((_, index) => (
					<Pagination.Item key={index} active={page === index + 1} onClick={() => setPage(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
				<Pagination.Last onClick={handleLast} disabled={page === totalPage}>
					Trang cuối
				</Pagination.Last>
			</Pagination>
		</div>
	);
}

export default CustomerList;
