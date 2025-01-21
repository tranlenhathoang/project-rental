import React, { useEffect, useRef, useState } from "react";
import CustomerItem from "./CustomerItem";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Pagination from "react-bootstrap/Pagination";
import { HiMiniArrowPath } from "react-icons/hi2";
import { PAGE_SIZE } from "../apiProject/constant";
import { getAllCustomer, searchByName } from "../apiProject/customerService";

function CustomerList() {
	const [customerList, setCustomerList] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE); //tổng bản ghi muốn lấy. Hiện tại constant cho PAGE_SIZE = 3
	const [page, setPage] = useState(1); //(1) là trang đầu tiên
	const [totalPage, setTotalPage] = useState(0); //tổng bản ghi trong db chia tổng bản ghi muốn lấy (làm tròn đến số nguyên, nếu không kết quả chia sẽ là số thực)
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const [data, totalRecords] = await getAllCustomer(page, totalSize);
			setCustomerList(data);
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [page, reload]);

	const reloadData = () => {
		setReload(!reload);
	};
	const searchNameRef = useRef();
	const searchIdentityRef = useRef();
	const handleSearch = async () => {
		let searchName = searchNameRef.current.value.trim();
		let searchIdentity = searchIdentityRef.current.value.trim();
		const fetchData = await searchByName(searchName, searchIdentity);
		setCustomerList(() => [...fetchData]);
	};

	const handleFirst = () => {
		setPage(1); //page đầu tiên luôn là 1
	};
	const handlePrev = () => {
		setPage(page - 1); //page hiện tại -1, trở về trước
	};
	const handleNext = () => {
		setPage(page + 1); //page hiện tại +1, tiến 1
	};
	const handleLast = () => {
		setPage(totalPage); //không thể biết trước được trang cuối nên Last sẽ bằng totalPage
	};

	return (
		<div>
			<div className="p-4">
				<h5 className="mb-4">Tìm kiếm thông tin khách hàng</h5>

				<form>
					<div className="row mb-3 ">
						<div className="col-6 d-flex align-items-center ">
							<label htmlFor="customerName" className="form-label me-3 mt-3">
								Tên khách hàng:
							</label>
							<input ref={searchNameRef} type="text" id="customerName" className="search" placeholder="Tên khách hàng" />
						</div>
						<div className="col-6 d-flex align-items-center">
							<label htmlFor="customerID" className="form-label me-3 mt-3">
								CMND:
							</label>
							<input ref={searchIdentityRef} type="text" id="customerID" className="search" placeholder="Số chứng minh nhân dân" />
							<button
								onClick={handleSearch}
								type="button"
								className="btn btn-secondary rounded-circle ms-3 d-flex justify-content-center align-items-center"
								style={{ width: "40px", height: "40px" }}
							>
								<IoSearchSharp color="red" />
							</button>
							<button
								type="button"
								className="btn btn-secondary rounded-circle ms-3 d-flex justify-content-center align-items-center"
								style={{ width: "43px", height: "43px" }}
								onClick={reloadData}
							>
								<HiMiniArrowPath />
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="list">
				<div className="header text-center text-white mt-2">
					<h2>DANH SÁCH KHÁCH HÀNG</h2>
				</div>
				{/* Button */}
				<div className="d-flex justify-content-start align-items-center gap-2 mb-2 ms-2">
					<Link className="btn btn-sm btn-success" id="add-link" to="/">
						Thêm mới
					</Link>
					<Link className="btn btn-sm btn-danger" id="delete-link" to="/">
						Xóa tất cả
					</Link>
				</div>

				{/* Table */}
				<table className="table table-light table-bordered table-striped">
					<thead>
						<tr className="text-white">
							<th className="text-center">STT</th>
							<th className="text-center">Họ Tên</th>
							<th className="text-center">CMND</th>
							<th className="text-center">Email</th>
							<th className="text-center">Số điện thoại</th>
							<th className="text-center">Ngày sinh</th>
							<th className="text-center">Địa chỉ</th>
							<th className="text-center">Website</th>
							<th className="text-center">Công ty</th>

							<th className="text-center" style={{ width: 200 }}>
								Mặt bằng
							</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{customerList.map((c, i) => (
							<CustomerItem key={c.id} customer={c} i={(page - 1) * PAGE_SIZE + i} />
						))}
					</tbody>
				</table>
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
