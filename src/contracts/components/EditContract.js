import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelect from "./CustomSelect";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllPremises } from "../apiProject/apiPremises";
import { useNavigate, useParams } from "react-router-dom";
import { getContractById, updateContract } from "../apiProject/apiContract";
import { getAllCustomer } from "../apiProject/apiCustomer";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

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
		toast.success("Chỉnh sửa thành công!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Bounce,
		});
		navigate("/contracts");
	};

	const validationSchema = Yup.object({
		term: Yup.string().required("Kì hạn là bắt buộc"),
		startDate: Yup.date().required("Ngày thuê là bắt buộc"),
		endDate: Yup.date().required("Ngày thuê là bắt buộc"),
		price: Yup.string()
			.required("Giá tiền là bắt buộc")
			.min(0, "Lớn hơn hoặc bằng 0")
			.matches(/^\d{1,3}(\.\d{3})*(,\d{2})?$/, "Điền đúng định dạng. VD: 6.000.000"),
		deposit: Yup.string()
			.required("Tiền cọc là bắt buộc")
			.min(0, "Lớn hơn hoặc bằng 0")
			.matches(/^\d{1,3}(\.\d{3})*(,\d{2})?$/, "Điền đúng định dạng. VD: 6.000.000"),
		total: Yup.string()
			.required("Tổng tiền là bắt buộc")
			.min(0, "Lớn hơn hoặc bằng 0")
			.matches(/^\d{1,3}(\.\d{3})*(,\d{2})?$/, "Điền đúng định dạng. VD: 6.000.000"),
		tax: Yup.string()
			.required("Mã số thuế là bắt buộc")
			.min(0, "Lớn hơn hoặc bằng 0")
			.matches(/^\d{10}$/, "Điền đúng định dạng. VD: 2020202020"),
	});

	if (!contract) {
		return <div className="container">Đang tải dữ liệu...</div>;
	}
	return (
		<>
			<div
				className="text-center py-4"
				style={{
					backgroundColor: "#e5a63b",
					color: "white",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h2>CHỈNH SỬA THÔNG TIN HỢP ĐỒNG</h2>
			</div>
			<div className="container mb-3">
				<Formik initialValues={contract} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ resetForm }) => (
						<Form className="mt-3">
							<Row>
								<Col>
									<label className="mb-3">Mặt bằng:</label>
									<CustomSelect
										name="premises"
										options={premises}
										placeholder="Nhập để tìm"
										value={selectedPremisesOption || ""}
										onSelect={(option) => setSelectedPremisesOption(option)}
									/>

									<label className="mt-3">Kì hạn (Tháng)</label>
									<Field type="number" name="term" className="form-control mt-3" />
									<ErrorMessage name="term" className="text-danger" component="div" />
								</Col>

								<Col>
									<label className="mb-3">Họ và tên khách hàng:</label>
									<CustomSelect
										name="customer"
										options={customers}
										placeholder="Nhập để tìm"
										value={selectedCustomerOption || ""}
										onSelect={(option) => setSelectedCustomerOption(option)}
									/>

									<label className="mt-3">Ngày bắt đầu thuê:</label>
									<Field type="date" className="form-control mt-3" name="startDate" />
									<ErrorMessage name="startDate" className="text-danger" component="div" />
								</Col>

								<Col>
									<label className="mb-3">Họ và tên nhân viên:</label>
									<CustomSelect
										name="employee"
										options={employees}
										placeholder="Nhập để tìm"
										value={selectedEmployeeOption || ""}
										onSelect={(option) => setSelectedEmployeeOption(option)}
									/>

									<label className="mt-3">Ngày kết thúc thuê:</label>
									<Field type="date" className="form-control mt-3" name="endDate" />
									<ErrorMessage name="endDate" className="text-danger" component="div" />
								</Col>
							</Row>

							<Row className="mt-4">
								<Col>
									<label>Giá tiền mỗi tháng (VNĐ):</label>
									<Field type="text" name="price" className="form-control mt-3" placeholder="Nhập giá tiền mỗi tháng" />
									<ErrorMessage name="price" className="text-danger" component="div" />

									<label className="mt-3">Tiền cọc (VNĐ):</label>
									<Field type="text" name="deposit" placeholder="Nhập tiền cọc" className="form-control mt-3" />
									<ErrorMessage name="deposit" className="text-danger" component="div" />
								</Col>

								<Col>
									<label>Tổng tiền (VNĐ):</label>
									<Field type="text" name="total" className="form-control mt-3" placeholder="Nhập tổng tiền" />
									<ErrorMessage name="total" className="text-danger" component="div" />

									<label className="mt-3">Mã số thuế:</label>
									<Field type="text" name="tax" className="form-control mt-3" />
									<ErrorMessage name="tax" className="text-danger" component="div" />
								</Col>
							</Row>

							<Row>
								<label className="mt-3">Hình ảnh hợp đồng:</label>
								<input
									type="file"
									className="mt-3"
									onChange={(event) => {
										formik.setFieldValue("file", event.currentTarget.files[0]);
									}}
								/>
								<label className="mt-3">Nội dung hợp đồng:</label>
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
		</>
	);
}

export default EditContract;
