import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getContractById } from "../apiProject/apiContract";
import { getAllPremises } from "../apiProject/apiPremises";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllCustomer } from "../apiProject/apiCustomer";
import CustomSelect from "./CustomSelect";

function DetailContract() {
	const [contract, setContract] = useState({
		customerId: undefined,
		premisesId: undefined,
		employeesId: undefined,
		tax: "",
		validity: "",
		term: "",
		startDate: "",
		endDate: "",
		price: "",
		deposit: "",
		total: "",
		content: "",
	});
	const [premises, setPremises] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [customers, setCustomers] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getContractById(id);
			const formattedData = {
				...data,
				startDate: data.startDate ? new Date(data.startDate).toLocaleDateString("vi-VN") : "",
				endDate: data.endDate ? new Date(data.endDate).toLocaleDateString("vi-VN") : "",
				customer: {
					...data.customer,
					dob: data.customer?.dob ? new Date(data.customer.dob).toLocaleDateString("vi-VN") : "",
				},
			};
			setContract(formattedData);

			const premisesData = await getAllPremises();
			setPremises(
				premisesData.map((premises) => ({
					value: premises.id,
					label: premises.premisesName,
				}))
			);

			const employeeData = await getAllEmployee();
			setEmployees(
				employeeData.map((employee) => ({
					value: employee.id,
					label: employee.name,
				}))
			);

			const customerData = await getAllCustomer();
			setCustomers(
				customerData.map((customers) => ({
					value: customers.id,
					label: customers.name,
				}))
			);
		};
		fetchData();
	}, [id]);

	const navigate = useNavigate();

	const styles = {
		fieldset: {
			border: "2px solid #ccc",
			borderRadius: "5px",
			padding: "15px",
			position: "relative",
			marginTop: "40px",
		},
		legend: {
			fontWeight: "bold",
			color: "#333",
			position: "absolute",
			top: "-25px",
			width: "25%",
			display: "inline-block",
			background: "#fff",
		},
	};

	return (
		<>
			<div
				className="text-center py-4"
				style={{
					backgroundColor: "#E3F2FD",
					color: "#0056B3",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h2>THÔNG TIN HỢP ĐỒNG</h2>
			</div>
			<div className="container mb-3">
				<fieldset style={styles.fieldset}>
					<legend style={styles.legend} className="ps-3">
						Thông tin khách hàng
					</legend>
					<Row className="mb-3">
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold fw-bold">Tên khách hàng:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									options={customers}
									value={contract.customer ? contract.customer.name : ""}
									readOnly
								/>
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">CMND:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.customer ? contract.customer.identity : ""}
									readOnly
								/>
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Địa chỉ KH:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.customer ? contract.customer.address : ""}
									readOnly
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Ngày sinh:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.customer ? contract.customer.dob : ""} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Email KH:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.customer ? contract.customer.email : ""}
									readOnly
								/>
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Số điện thoại KH:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.customer ? contract.customer.phone : ""}
									readOnly
								/>{" "}
							</div>
						</Col>
					</Row>
				</fieldset>

				<fieldset style={styles.fieldset}>
					<legend style={styles.legend} className="px-4">
						Thông tin hợp đồng
					</legend>
					<Row className="mb-3">
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Mã số thuế:</label>
								<input type="text" id="disabledTextInput" className="form-control" options={customers} value={contract.tax} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Trạng thái hợp đồng:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.validity} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Mã mặt bằng:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.premises ? contract.premises.premisesName : ""}
									readOnly
								/>
							</div>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Kì hạn:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.term} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Ngày bắt đầu:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.startDate} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Ngày kết thúc:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.endDate} readOnly />
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Giá tiền mỗi tháng:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.price} readOnly />{" "}
							</div>
						</Col>
						<Col md={4}>
							<div className="input-group" style={{ marginTop: "36px" }}>
								<label className="input-group-text fw-bold" id="inputGroup-sizing-default">
									Tổng tiền:
								</label>
								<input
									type="text"
									className="form-control"
									id="disabledTextInput"
									value={contract.total}
									readOnly
									aria-label="Sizing example input"
									aria-describedby="inputGroup-sizing-default"
								/>
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Tiền đặt cọc:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.deposit} readOnly />
							</div>
						</Col>
					</Row>
				</fieldset>

				<fieldset style={styles.fieldset}>
					<legend style={styles.legend} className="px-4">
						Thông tin nhân viên
					</legend>
					<Row className="mb-3">
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold fw-bold">Nhân viên:</label>
								<input type="text" id="disabledTextInput" className="form-control" value={contract.employee ? contract.employee.name : ""} readOnly />
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">SĐT Nhân viên:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.employee ? contract.employee.phone : ""}
									readOnly
								/>
							</div>
						</Col>
						<Col md={4}>
							<div className="mt-2">
								<label className="form-label mb-1 fw-bold">Email Nhân viên:</label>
								<input
									type="text"
									id="disabledTextInput"
									className="form-control"
									value={contract.employee ? contract.employee.email : ""}
									readOnly
								/>
							</div>
						</Col>
					</Row>
				</fieldset>

				<fieldset style={styles.fieldset}>
					<legend style={styles.legend} className="px-4">
						Nội dung hợp đồng
					</legend>
					<Row className="mb-3">
						<div className="mt-2">
							<textarea id="disabledTextInput" className="form-control" value={contract.content} readOnly />
						</div>
					</Row>
				</fieldset>

				<div className="form-check mt-4">
					<input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" checked defaultChecked />
					<label className="form-check-label" htmlFor="flexCheckChecked">
						Hai bên đã thống nhất với hợp đồng
					</label>
				</div>

				<div className="mt-4">
					<button className="btn btn-secondary" onClick={() => navigate("/contracts")}>
						Quay về
					</button>
				</div>
			</div>
		</>
	);
}

export default DetailContract;
