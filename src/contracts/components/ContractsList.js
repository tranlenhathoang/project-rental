import { React, useEffect, useRef, useState } from "react";
import ContractItem from "./ContractItem";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiArrowPath } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { getAllCustomer } from "../apiProject/apiCustomer";
import { getAllPremises } from "../apiProject/apiPremises";
import CustomSelect from "./CustomSelect";
import { changeStatus, deleteById, getAllContract, search } from "../apiProject/apiContract";
import { PAGE_SIZE } from "../apiProject/constant";
import DeleteContract from "./DeleteContract";

function ContractList() {
	const [customers, setCustomers] = useState([]);
	const [premises, setPremises] = useState([]);
	const [contract, setContract] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState("");
	const [reload, setReload] = useState(true);
	const [show, setShow] = useState(false);
	const [deleteContract, setDeleteContract] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const [data, total] = await getAllContract(page, totalSize);
			console.log(data);
			const premisesData = await getAllPremises();
			const customerData = await getAllCustomer();

			setContract(data);
			setTotalPage(Math.ceil(total / PAGE_SIZE));
			setPremises(
				premisesData.map((premises) => ({
					value: premises.id,
					label: premises.premisesName,
				}))
			);
			setCustomers(
				customerData.map((item) => ({
					value: item.id,
					label: item.name,
				}))
			);
		};
		fetchData();
	}, [page, reload, show]);

	const reloadData = () => {
		setReload(!reload);
	};

	const handleCheckboxChange = async (item) => {
		await changeStatus(item.id, !item.status);
		reloadData();
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

	const handleSearch = async () => {
		let premisesId = selectedOption?.value || "";
		let customerId = selectedCustomerOption?.value || "";

		const [data, total] = await search(customerId, premisesId, selectedStatus, page, PAGE_SIZE);
		setTotalPage(Math.ceil(total / totalSize));
		setContract(data);
	};
	//sau khi search thì phải cập nhật lại giao diện phân trang

	const handleShow = (contract) => {
		setShow(true);
		setDeleteContract(contract);
	};
	const handleClose = (contract) => {
		setShow(false);
		setDeleteContract(null);
	};
	const handleDelete = async () => {
		try {
			await deleteById(deleteContract.id);
			handleClose();
		} catch (error) { }
	};

	return (
		<div className="container my-3">
			<div className="text-center mb-5">
				<h2>DANH SÁCH HỢP ĐỒNG </h2>
			</div>
			<div className="mb-3">
				<Row>
					<Col>
						<CustomSelect
							options={customers}
							placeholder="Tìm kiếm tên khách hàng"
							value={selectedCustomerOption}
							onSelect={(option) => setSelectedCustomerOption(option)}
						/>
					</Col>

					<Col>
						<CustomSelect
							options={premises}
							placeholder="Tìm kiếm tên mặt bằng"
							value={selectedOption}
							onSelect={(option) => setSelectedOption(option)}
						/>
					</Col>

					<Col>
						<select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
							<option value="">Tất cả trạng thái</option>
							<option value="true">Đã thuê</option>
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
				<Link className="btn btn-success me-2" to="/contracts/add">
					Thêm mới
				</Link>
				<button className="btn btn-secondary" title="Tải lại dữ liệu" onClick={reloadData}>
					<HiArrowPath className="d-flex justify-content-center align-items-center" style={{ width: "20px", height: "25px" }} />
				</button>
			</div>
			<table className="table table-striped table-bordered table-light">
				<thead>
					<tr className="table-dark">
						<th className="text-center">ID</th>
						<th className="text-center">Tên Khách Hàng</th>
						<th className="text-center" style={{ width: "150px" }}>
							Tên Mặt Bằng
						</th>
						<th className="text-center" style={{ width: "150px" }}>
							Đang Thuê
						</th>
						<th className="text-center" style={{ width: "220px" }}></th>
					</tr>
				</thead>
				<tbody>
					{contract.length === 0 ? (
						<tr>
							<td colSpan="8" className="text-center">
								Không có dữ liệu
							</td>
						</tr>
					) : (
						contract.map((item, i) => (
							<ContractItem
								key={item.id}
								i={(page - 1) * PAGE_SIZE + i}
								item={item}
								handleCheckboxChange={handleCheckboxChange}
								handleShow={handleShow}
							/>
						))
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

			<DeleteContract show={show} contracts={deleteContract} handleClose={handleClose} handleDelete={handleDelete} />
		</div>
	);
}

export default ContractList;
