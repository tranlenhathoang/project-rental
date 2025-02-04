import { React, useEffect, useRef, useState } from "react";
import ContractItem from "./ContractItem";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiArrowPath } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { changeStatus, getAllCustomer, searchCustomerByName } from "../apiProject/apiCustomer";
import { getAllContracts } from "../apiProject/apiContract";
import CustomSelect from "./CustomSelect";

function ContractList() {
	const [customers, setCustomers] = useState([]);
	const [contracts, setContracts] = useState([]);
	const [totalSize, setTotalSize] = useState(3);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [reload, setReload] = useState(true);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllCustomer(page, totalSize);
			const contractData = await getAllContracts();

			setCustomers(data);
			setTotalPage(Math.ceil(total / totalSize));
			setContracts(
				contractData.map((contract) => ({
					value: contract.id,
					label: contract.premises,
				}))
			);
		};
		fetchData();
	}, [page, reload]);

	const reloadData = () => {
		setReload(!reload);
	};

	const handleCheckboxChange = async (id, status) => {
		await changeStatus(id, status);

		const fetchData = async () => {
			const [data, total] = await getAllCustomer(page, totalSize);
			setCustomers(data);
			setTotalPage(Math.ceil(total / totalSize));
		};
		fetchData();
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

	const searchCustomerNameRef = useRef();

	const handleSearch = async () => {
		let name = searchCustomerNameRef.current.value.trim();
		let contractId = selectedOption?.value || "";

		let result = await searchCustomerByName(name, contractId, selectedStatus);
		setCustomers(result);
	};

	return (
		<div className="container my-3">
			<div className="text-center mb-5">
				<h3>DANH SÁCH HỢP ĐỒNG </h3>
			</div>
			<div className="mb-3">
				<Row>
					<Col>
						<input name="searchCustomerName" placeholder="Tìm kiếm theo tên khách hàng" className="form-control" ref={searchCustomerNameRef} />
					</Col>

					<Col>
						<CustomSelect options={contracts} placeholder="Tìm kiếm tên mặt bằng" onSelect={(option) => setSelectedOption(option)} />
					</Col>

					<Col>
						<select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
							<option value="">Tất cả trạng thái</option>
							<option value="true">Đã Thuê</option>
							<option value="false">Trống</option>
						</select>
					</Col>

					<Col>
						<button
							type="button"
							className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
							style={{ width: "40px", height: "40px" }}
							onClick={handleSearch}
						>
							<FaSearch color="red" />
						</button>
					</Col>
				</Row>
			</div>
			<div className="mb-3">
				<Link className="btn btn-success me-2">Thêm mới</Link>
				<button className="btn btn-secondary" onClick={reloadData}>
					<HiArrowPath className="d-flex justify-content-center align-items-center" style={{ width: "20px", height: "25px" }} />
				</button>
			</div>
			<table className="table table-striped table-bordered table-light">
				<thead>
					<tr className="table-dark">
						<th className="text-center">ID</th>
						<th className="text-center">Tên Khách Hàng</th>
						<th className="text-center">Tên Mặt Bằng</th>
						<th className="text-center">Đang Thuê</th>
						<th className="text-center" colSpan="3"></th>
					</tr>
				</thead>
				<tbody>
					{customers.length === 0 ? (
						<tr>
							<td colSpan="8" className="text-center">
								Không có dữ liệu
							</td>
						</tr>
					) : (
						customers.map((contract, i) => <ContractItem key={contract.id} i={i} contract={contract} handleCheckboxChange={handleCheckboxChange} />)
					)}
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
