import React, { useEffect, useRef, useState } from "react";
import CustomerItem from "./CustomerItem";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Pagination from "react-bootstrap/Pagination";
import { HiMiniArrowPath } from "react-icons/hi2";
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
		const fetchData = await searchByName(searchName, searchIdentity, searchPhone);
		setCustomerList(() => [...fetchData]);
	};

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
			<div className="p-4">
				<h5 className="mb-4">Tìm kiếm thông tin khách hàng</h5>
				<Row className="g-4 align-items-center">
					<Col xs="auto">
						<div className="d-flex align-items-center">
							<label htmlFor="customerName" className="me-2" style={{ width: "130px", whiteSpace: "nowrap" }}>
								Tên khách hàng:
							</label>
							<input ref={searchNameRef} type="text" id="customerName" className="form-control" placeholder="Tên khách hàng" />
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex align-items-center">
							<label htmlFor="customerID" className="me-2" style={{ width: "130px", whiteSpace: "nowrap" }}>
								CMND:
							</label>
							<input ref={searchIdentityRef} type="text" id="customerID" className="form-control" placeholder="Số chứng minh nhân dân" />
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex align-items-center">
							<label htmlFor="customerPhone" className="me-2" style={{ width: "130px", whiteSpace: "nowrap" }}>
								Số điện thoại:
							</label>
							<input ref={searchPhoneRef} type="text" id="customerPhone" className="form-control" placeholder="Số điện thoại" />
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
								<IoSearchSharp color="red" />
							</button>
							<button
								type="button"
								className="btn btn-secondary rounded-circle ms-2 d-flex justify-content-center align-items-center"
								style={{ width: "43px", height: "43px" }}
								onClick={reloadData}
							>
								<HiMiniArrowPath />
							</button>
						</div>
					</Col>
				</Row>
			</div>

			<div className={styles.list}>
				<div className="text-center mt-2">
					<h2>DANH SÁCH KHÁCH HÀNG</h2>
				</div>
				<div className="d-flex justify-content-start align-items-center gap-2 mb-2 ms-2">
					<Link className="btn btn-sm btn-success" to="/add_customers">
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
				<Pagination.First onClick={handleFirst} disabled={page === 1} />
				<Pagination.Prev onClick={handlePrev} disabled={page === 1} />
				{[...Array(totalPage || 0)].map((_, index) => (
					<Pagination.Item key={index} active={page === index + 1} onClick={() => setPage(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
				<Pagination.Last onClick={handleLast} disabled={page === totalPage} />
			</Pagination>
		</div>
	);
}

export default CustomerList;
