import React from "react";
import { Link } from "react-router-dom";

function ContractItem(props) {
	const { id, customer, premises } = props.item;

	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{customer.name}</td>
			<td className="text-center">{premises ? premises.premisesName : ""}</td>
			<td className="text-center">
				<input type="checkbox" checked={customer.status} onChange={() => props.handleCheckboxChange(premises.id, !customer.status)} />
			</td>
			<td className="text-center">
				<Link type="button" className="btn btn-info">
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
