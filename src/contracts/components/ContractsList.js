import { React, useEffect, useState } from "react";
import ContractItem from "./ContractItem";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiArrowPath } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { changeStatus, getAllCustomer } from "../apiProject/apiCustomer";

function ContractList() {
	const [customers, setCustomers] = useState([]);
	const [totalSize, setTotalSize] = useState(3);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllCustomer(page, totalSize);
			setCustomers(data);
			setTotalPage(Math.ceil(total / totalSize));
		};
		fetchData();
	}, [page]);

	const handleCheckboxChange = async (id, status) => {
		await changeStatus(id, status);
		setCustomers(await getAllCustomer());
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

	return (
		<div className="container my-3">
			<div className="text-center mb-5">
				<h3>DANH SÁCH HỢP ĐỒNG </h3>
			</div>
			<div className="mb-3">
				<Row>
					<Col>
						<input name="searchCustomerName" placeholder="Tìm kiếm theo tên khách hàng" className="search" />
					</Col>
					<Col>
						<input name="searchPremises" placeholder="Tìm kiếm theo mã mặt bằng" className="search" />
					</Col>
					<Col>
						<input name="searchStartDate" placeholder="Tìm theo ngày bắt đầu" className="searchDate" />
					</Col>
					<Col>
						<input name="searchEndDate" placeholder="Tìm theo ngày kết thúc" className="searchDate" />
					</Col>
					<Col>
						<button
							type="button"
							className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
							style={{ width: "40px", height: "40px" }} // Kích thước nút
						>
							<FaSearch color="red" />
						</button>
					</Col>
				</Row>
			</div>
			<div className="mb-3">
				<Link className="btn btn-success me-2">Thêm mới</Link>
				<Link className="btn btn-secondary">
					<HiArrowPath className="d-flex justify-content-center align-items-center" style={{ width: "20px", height: "25px" }} />
				</Link>
			</div>
			<table className="table table-striped table-bordered table-light">
				<thead>
					<tr className="table-dark">
						<th className="text-center">ID</th>
						<th className="text-center">Tên Khách Hàng</th>
						<th className="text-center">Tên Mặt Bằng</th>
						<th className="text-center">Đang Thuê</th>
						<th className="text-center" colspan="3"></th>
					</tr>
				</thead>
				<tbody>
					{customers.map((contract, i) => (
						<ContractItem key={contract.id} i={i} contract={contract} handleCheckboxChange={handleCheckboxChange} />
					))}
				</tbody>
			</table>

			<Pagination className="container my-4 d-flex justify-content-center">
				<Pagination.Item onClick={handleFirst} disabled={page === 1}>
					Trang đầu
				</Pagination.Item>
				<Pagination.Prev onClick={handlePrev} disabled={page === 1} />
				{[...new Array(totalPage)].map((e, index) => (
					<Pagination.Item active={page === index + 1} onClick={() => setPage(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}

				<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
				<Pagination.Item onClick={handleLast} disabled={page === totalPage}>
					Trang cuối
				</Pagination.Item>
			</Pagination>
		</div>
	);
}

export default ContractList;
