import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, useFormik, resetForm } from "formik";
import CustomSelect from "./CustomSelect";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllPremises } from "../apiProject/apiPremises";
import { useNavigate, useParams } from "react-router-dom";
import { getContractById, updateContract } from "../apiProject/apiContract";
import { getAllCustomer } from "../apiProject/apiCustomer";

function EditContract() {
	const [contract, setContract] = useState(null);
	const [premises, setPremises] = useState([]);
	const [selectedPremisesOption, setSelectedPremisesOption] = useState(null);
	const [selectedEmployeeOption, setSelectedEmployeeOption] = useState(null);
	const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
	const [employees, setEmployees] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [reload, setReload] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getContractById(id);
			setContract(data);
			if (data.customer) {
				setSelectedCustomerOption({
					label: data.customer.name,
					value: data.customer.id,
				});
			}
			if (data.premises) {
				setSelectedPremisesOption({
					label: data.premises.premisesName,
					value: data.premises.id,
				});
			}

			if (data.employee) {
				setSelectedEmployeeOption({
					label: data.employee.name,
					value: data.employee.id,
				});
			}

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
			employeeId: selectedEmployeeOption.value,
		};

		await updateContract(contract.id, contract);
		navigate("/contracts");
	};

	if (!contract) {
		return <div className="container">Đang tải dữ liệu...</div>;
	}
	return (
		<div className="container mb-3">
			<div className="text-center mb-4">
				<h3>CHỈNH SỬA THÔNG TIN HỢP ĐỒNG</h3>
			</div>
			<Formik initialValues={contract} onSubmit={handleSubmit}>
				{({ resetForm }) => (
					<Form className="mt-3">
						<Row>
							<Col>
								<label className="mb-3">Mặt bằng</label>
								<CustomSelect
									name="premises"
									options={premises}
									placeholder="Nhập để tìm"
									value={selectedPremisesOption || ""}
									onSelect={(option) => setSelectedPremisesOption(option)}
								/>

								<label className="mt-3">Kì hạn (Tháng)</label>
								<Field type="number" name="term" className="form-control mt-3" />
							</Col>

							<Col>
								<label className="mb-3">Họ và tên khách hàng</label>
								<CustomSelect
									name="customer"
									options={customers}
									placeholder="Nhập để tìm"
									value={selectedCustomerOption || ""}
									onSelect={(option) => setSelectedCustomerOption(option)}
								/>

								<label className="mt-3">Ngày bắt đầu thuê</label>
								<Field type="date" className="form-control mt-3" name="startDate" />
							</Col>

							<Col>
								<label className="mb-3">Họ và tên nhân viên</label>
								<CustomSelect
									name="employee"
									options={employees}
									placeholder="Nhập để tìm"
									value={selectedEmployeeOption || ""}
									onSelect={(option) => setSelectedEmployeeOption(option)}
								/>

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
							<button
								type="reset"
								className="btn btn-danger"
								onClick={() => {
									resetForm();
									setSelectedPremisesOption(null);
									setSelectedCustomerOption(null);
									setSelectedEmployeeOption(null);
									setReload(!reload);
								}}
							>
								Làm mới
							</button>
							<button className="btn btn-secondary" onClick={() => navigate("/contracts")}>
								Quay về
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EditContract;
