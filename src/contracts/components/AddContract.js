import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field } from "formik";
import CustomSelect from "./CustomSelect";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllPremises } from "../apiProject/apiPremises";

function AddContract() {
	const [contract, setContract] = useState({
		tax: "",
		term: "",
		startDate: "",
		endDate: "",
		price: "",
		deposit: "",
		total: "",
	});
	const [premises, setPremises] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const contractData = await getAllPremises();
			setPremises(
				contractData.map((contract) => ({
					value: contract.id,
					label: contract.premises,
				}))
			);

			const employeeData = await getAllEmployee();
			setEmployees(
				employeeData.map((employee) => ({
					value: employee.id,
					label: employee.name,
				}))
			);
		};
		fetchData();
	}, []);

	const handleSubmit = async (value) => {};

	return (
		<div className="container mb-3">
			<div className="text-center mb-4">
				<h3>THÊM MỚI HỢP ĐỒNG</h3>
			</div>
			<Formik initialValues={contract} onSubmit={handleSubmit}>
				<Form className="mt-3">
					<Row>
						<Col>
							<label className="mb-3">Mặt bằng</label>
							<CustomSelect options={premises} onSelect={(option) => setSelectedOption(option)} />

							<label className="mt-3">Kì hạn (Tháng)</label>
							<Field type="text" name="term" className="form-control mt-3" />
						</Col>

						<Col>
							<label>Họ và tên khách hàng</label>
							<Field type="text" name="customerName" className="form-control mt-3" placeholder="Nhập để tìm" />

							<label className="mt-3">Ngày bắt đầu thuê</label>
							<Field type="date" className="form-control mt-3" name="startDate" />
						</Col>

						<Col>
							<label className="mb-3">Họ và tên nhân viên</label>
							<CustomSelect options={employees} onSelect={(option) => setSelectedOption(option)} />

							<label className="mt-3">Ngày kết thúc thuê</label>
							<Field type="date" className="form-control mt-3" name="endDate" />
						</Col>
					</Row>

					<Row className="mt-4">
						<Col>
							<label>Giá tiền mỗi tháng (VNĐ)</label>
							<Field type="text" name="customerName" className="form-control mt-3" placeholder="Nhập để tìm" />

							<label className="mt-3">Tiền cọc (VNĐ)</label>
							<Field type="text" name="customerName" className="form-control mt-3" />
						</Col>

						<Col>
							<label>Tổng tiền (VNĐ)</label>
							<Field type="text" name="customerName" className="form-control mt-3" placeholder="Nhập để tìm" />

							<label className="mt-3">Mã số thuế</label>
							<Field type="text" name="customerName" className="form-control mt-3" />
						</Col>
					</Row>

					<Row>
						<label className="mt-3">Hình ảnh hợp đồng</label>
						<Field type="file" className="mt-3" />

						<label className="mt-3">Nội dung hợp đồng</label>
						<Field as="textarea" rows="4" cols="50" className="form-control mt-3" />
					</Row>

					<div className="mt-5 d-flex justify-content-end gap-4">
						<button type="submit" className="btn btn-success" id="buttonSubmit">
							Lưu
						</button>
						<button className="btn btn-danger">Làm mới</button>
						<button className="btn btn-secondary">Quay về</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

export default AddContract;
