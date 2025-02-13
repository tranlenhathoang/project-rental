import React, { useState } from "react";
import { Link } from "react-router-dom";

function ContractItem(props) {
	const { id, customer, premises, status } = props.item;

	const changeStatusContract = () => {
		//setStatusContract(!statusContract);
		props.handleCheckboxChange(props.item);
	};

	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{customer.name}</td>
			<td className="text-center">{premises ? premises.premisesName : ""}</td>
			<td className="text-center">
				<input type="checkbox" checked={status} onChange={() => changeStatusContract()} />
			</td>
			<td className="text-center">
				<Link type="button" className="btn btn-primary" to={"/contracts/detail/" + id}>
					Chi tiết
				</Link>
			</td>
			<td className="text-center">
				<Link type="button" className="btn btn-warning" to={"/contracts/edit/" + id}>
					Sửa
				</Link>
			</td>

			<td className="text-center">
				<button type="button" className="btn btn-danger" onClick={() => props.handleShow(props.item)}>
					Xóa
				</button>
			</td>
		</tr>
	);
}

export default ContractItem;
