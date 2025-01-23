import React from "react";
import { Link } from "react-router-dom";

function CustomerItem(props) {
	const { name, identity, email, phone } = props.customer;
	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{name}</td>
			<td className="text-center">{identity}</td>
			<td className="text-center">{email}</td>
			<td className="text-center">{phone}</td>

			<td className="text-center">
				<Link className="btn btn-primary me-3" to={"/"}>
					Chi tiết
				</Link>
			</td>
			<td className="text-center">
				<Link className="btn btn-dark me-3" to={"/"}>
					Xem dịch vụ
				</Link>
			</td>
			<td className="text-center">
				<button className="btn btn-warning me-3">Sửa</button>
			</td>
		</tr>
	);
}
export default CustomerItem;
