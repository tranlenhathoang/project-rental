import React from "react";
import { Link } from "react-router-dom";

function CustomerItem(props) {
	const { id, name, identity, email, phone } = props.customer;
	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-start">{name}</td>
			<td className="text-end">{identity}</td>
			<td className="text-start">{email}</td>
			<td className="text-end">{phone}</td>
			<td className="text-center">
				<Link className="btn btn-primary me-3" to={"/floor?customerId=" + id}>
					Chi tiết
				</Link>
			</td>
			<td className="text-center">
				<Link className="btn btn-dark me-3" to={`/services/${id}`}>
					Xem dịch vụ
				</Link>
			</td>
			<td className="text-center">
				<Link className="btn btn-primary me-3" to={"/detail/" + id}>
					Chi tiết
				</Link>
				<Link className="btn btn-warning me-3" to={"/edit/" + id}>
					Sửa
				</Link>
				<button onClick={() => props.showModalDelete(props.customer)} className="btn btn-danger me-3">
					Xoá
				</button>
			</td>
		</tr>
	);
}
export default CustomerItem;
