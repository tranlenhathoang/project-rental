import React, { useEffect, useState } from "react";
import CustomerItem from "./CustomerItem";
import { getAllCustomer } from "../services/customerService";
import { Link } from "react-router-dom";

function CustomerList() {
	const [customerList, setCustomerList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const list = await getAllCustomer();
			setCustomerList(list);
		};
		fetchData();
	}, []);

	return (
		<div>
			<div className="list">
				<div className="header text-center text-white">
					<h2>DANH SÁCH KHÁCH HÀNG</h2>
				</div>
				{/* Button */}
				<div className="d-flex justify-content-start align-items-center gap-2 mb-2 ms-2">
					<Link className="btn btn-sm btn-success" id="add-link" to="/add_product">
						Thêm mới
					</Link>
					<Link className="btn btn-sm btn-danger" id="delete-link" to="/delete_all">
						Xóa tất cả
					</Link>
				</div>

				{/* Table */}
				<table className="table table-light table-bordered table-striped">
					<thead>
						<tr className="text-white">
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
