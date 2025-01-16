import React from "react";

function ContractItem(props) {
	const { name, premises, status } = props.contract;

	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{name}</td>
			<td className="text-center">{premises}</td>
			<td className="text-center">
				<input type="checkbox" checked={status ? "checked" : ""} />
			</td>
			<td className="text-center">
				<button type="button">Chi tiết</button>
			</td>
			<td className="text-center">
				<button type="button">Sửa</button>
			</td>

			<td className="text-center">
				<button type="button">Xóa</button>
			</td>
		</tr>
	);
}

export default ContractItem;
