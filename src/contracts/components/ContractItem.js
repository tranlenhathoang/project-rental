import React from "react";

function ContractItem(props) {
	const { name, contract, status } = props.contract;

	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{name}</td>
			<td className="text-center">{contract ? contract.premises : ""}</td>
			<td className="text-center">
				<input type="checkbox" checked={status} onChange={() => props.handleCheckboxChange(props.contract.id, !status)} />
			</td>
			<td className="text-center">
				<button type="button" className="btn btn-info">
					Chi tiết
				</button>
			</td>
			<td className="text-center">
				<button type="button" className="btn btn-warning">
					Sửa
				</button>
			</td>

			<td className="text-center">
				<button type="button" className="btn btn-danger">
					Xóa
				</button>
			</td>
		</tr>
	);
}

export default ContractItem;
