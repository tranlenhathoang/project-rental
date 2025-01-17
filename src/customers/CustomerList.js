import React, { useEffect, useRef, useState } from "react";
import CustomerItem from "./CustomerItem";
import { getAllCustomer, searchByName } from "../apiProject/apiCustomerList";
import { Link } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";

function CustomerList() {
	const [customerList, setCustomerList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const list = await getAllCustomer();
			setCustomerList(list);
		};
		fetchData();
	}, []);

	const searchNameRef = useRef();
	const searchIdentityRef = useRef();
	const handleSearch = async () => {
		let searchName = searchNameRef.current.value.trim();
		let searchIdentity = searchIdentityRef.current.value.trim();
		const fetchData = await searchByName(searchName, searchIdentity);
		setCustomerList(() => [...fetchData]);
	};

	return (
		<div>
			<div className="  p-4  ">
				<h5 className="mb-4">Tìm kiếm thông tin khách hàng</h5>
				<form>
					<div className="row mb-3 ">
						<div className="col-6 d-flex align-items-center ">
							<label htmlFor="customerName" className="form-label me-3">
								Tên khách hàng:
							</label>
							<input ref={searchNameRef} type="text" id="customerName" className="form-control  w-50 " placeholder="Tên khách hàng" />
						</div>
						<div className="col-6 d-flex align-items-center">
							<label htmlFor="customerID" className="form-label me-3">
								CMND:
							</label>
							<input ref={searchIdentityRef} type="text" id="customerID" className="form-control w-50" placeholder="Số chứng minh nhân dân" />
							<button onClick={handleSearch} type="button" className="btn btn-secondary rounded-5 ms-3">
								<IoSearchCircleSharp style={{ fontSize: "2rem" }} />
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
							<CustomerItem key={c.id} customer={c} i={i} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default CustomerList;
