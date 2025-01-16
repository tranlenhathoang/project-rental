import { React, useEffect, useState } from "react";
import ContractItem from "./ContractItem";
import { getAllCustomer } from "../services/customerService";

function ContractList() {
	const [contracts, setContracts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setContracts(await getAllCustomer());
		};
		fetchData();
	}, []);

	return (
		<div className="container my-3">
			<div className="text-center mb-3">
				<h3>DANH SÁCH HỢP ĐỒNG </h3>
			</div>
			<table className="table table-striped table-light">
				<thead>
					<tr>
						<th className="text-center">ID</th>
						<th className="text-center">Tên Khách Hàng</th>
						<th className="text-center">Tên Mặt Bằng</th>
						<th className="text-center">Đang Thuê</th>
						<th className="text-center"></th>
						<th className="text-center"></th>
						<th className="text-center"></th>
					</tr>
				</thead>
				<tbody>
					{contracts.map((contract, i) => (
						<ContractItem key={contract.id} i={i} contract={contract} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ContractList;
