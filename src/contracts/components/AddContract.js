import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, useFormik } from "formik";
import CustomSelect from "./CustomSelect";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllPremises } from "../apiProject/apiPremises";
import { useNavigate } from "react-router-dom";
import { addNewContract } from "../apiProject/apiContract";
import { getAllCustomer } from "../apiProject/apiCustomer";

function AddContract() {
	const [contract, setContract] = useState({
		customerId: undefined,
		premisesId: undefined,
		tax: "",
		validity: "còn hiệu lực",
		term: "",
		startDate: "",
		endDate: "",
		price: "",
		deposit: "",
		total: "",
		content: "",
		status: true,
	});
	const [premises, setPremises] = useState([]);
	const [selectedPremisesOption, setSelectedPremisesOption] = useState(null);
	const [selectedEmployeeOption, setSelectedEmployeeOption] = useState(null);
	const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
	const [employees, setEmployees] = useState([]);
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
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
	}, [contract]);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: { file: null },
		onSubmit: (values) => {
			console.log("File đã chọn:", values.file);
		},
	});

	const handleSubmit = async (value) => {
		const contract = {
			...value,
			premisesId: selectedPremisesOption.value,
			customerId: selectedCustomerOption.value,
			startDate: new Date(value.startDate).toLocaleDateString("vi-VN", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
			endDate: new Date(value.endDate).toLocaleDateString("vi-VN", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		};

		await addNewContract(contract);
		navigate("/contracts");
	};

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
							<CustomSelect name="premises" options={premises} placeholder="Nhập để tìm" onSelect={(option) => setSelectedPremisesOption(option)} />

							<label className="mt-3">Kì hạn (Tháng)</label>
							<Field type="number" name="term" className="form-control mt-3" />
						</Col>

						<Col>
							<label className="mb-3">Họ và tên khách hàng</label>
							<CustomSelect name="customer" options={customers} placeholder="Nhập để tìm" onSelect={(option) => setSelectedCustomerOption(option)} />

							<label className="mt-3">Ngày bắt đầu thuê</label>
							<Field type="date" className="form-control mt-3" name="startDate" />
						</Col>

						<Col>
							<label className="mb-3">Họ và tên nhân viên</label>
							<CustomSelect name="employee" options={employees} onSelect={(option) => setSelectedEmployeeOption(option)} />

							<label className="mt-3">Ngày kết thúc thuê</label>
							<Field type="date" className="form-control mt-3" name="endDate" />
						</Col>
					</Row>

					<Row className="mt-4">
						<Col>
							<label>Giá tiền mỗi tháng (VNĐ)</label>
							<Field type="text" name="price" className="form-control mt-3" placeholder="Nhập giá tiền mỗi tháng" />

							<label className="mt-3">Tiền cọc (VNĐ)</label>
							<Field type="text" name="deposit" placeholder="Nhập tiền cọc" className="form-control mt-3" />
						</Col>

						<Col>
							<label>Tổng tiền (VNĐ)</label>
							<Field type="text" name="total" className="form-control mt-3" placeholder="Nhập tổng tiền" />

							<label className="mt-3">Mã số thuế</label>
							<Field type="text" name="tax" className="form-control mt-3" />
						</Col>
					</Row>

					<Row>
						<label className="mt-3">Hình ảnh hợp đồng</label>
						<input
							type="file"
							className="mt-3"
							onChange={(event) => {
								formik.setFieldValue("file", event.currentTarget.files[0]);
							}}
						/>
						<label className="mt-3">Nội dung hợp đồng</label>
						<Field as="textarea" rows="4" cols="50" className="form-control mt-3" name="content" />
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
