import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelect from "./CustomSelect";
import { getAllEmployee } from "../apiProject/apiEmployee";
import { getAllPremises } from "../apiProject/apiPremises";
import { useNavigate } from "react-router-dom";
import { addNewContract } from "../apiProject/apiContract";
import { getAllCustomer } from "../apiProject/apiCustomer";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

function AddContract() {
	const [contract, setContract] = useState({
		customer: undefined,
		premises: undefined,
		employee: "",
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
	const [reload, setReload] = useState(true);

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

	const calculateTerm = (startDate, endDate) => {
		if (!startDate || !endDate) return "";
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (end < start) return "";
		return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
	};

	const handleSubmit = async (value) => {
		const contract = {
			...value,
			premisesId: selectedPremisesOption.value,
			customerId: selectedCustomerOption.value,
			employeeId: selectedEmployeeOption.value,
		};

		await addNewContract(contract);
		toast.success("Thêm mới thành công!", {
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

		endDate: Yup.date()
			.required("Ngày thuê là bắt buộc")
			.test("isAfterStartDate", "Ngày kết thúc phải sau ngày bắt đầu", function (value) {
				return !this.parent.startDate || new Date(value) >= new Date(this.parent.startDate);
			}),

		price: Yup.string().required("Giá tiền là bắt buộc").min(0, "Lớn hơn hoặc bằng 0").matches(/^\d+$/, "Điền đúng định dạng. VD: 6.000.000"),

		deposit: Yup.string().required("Tiền cọc là bắt buộc").min(0, "Lớn hơn hoặc bằng 0"),

		total: Yup.string().required("Tổng tiền là bắt buộc").min(0, "Lớn hơn hoặc bằng 0"),

		tax: Yup.string()
			.required("Mã số thuế là bắt buộc")
			.min(0, "Lớn hơn hoặc bằng 0")
			.matches(/^\d{10}$/, "Điền đúng định dạng. VD: 2020202020"),
	});

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
				<h2>THÊM MỚI HỢP ĐỒNG</h2>
			</div>
			<div className="container mb-3">
				<Formik initialValues={contract} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ values, setFieldValue, resetForm }) => (
						<Form className="mt-3">
							<Row>
								<Col>
									<label className="mb-3">Mặt bằng: (*)</label>
									<CustomSelect
										name="premises"
										options={premises}
										placeholder="Nhập để tìm"
										value={selectedPremisesOption || ""}
										onSelect={(option) => setSelectedPremisesOption(option)}
									/>

									<label className="mt-3 mb-3">Kỳ hạn (tháng):</label>
									<Field type="text" name="term" className="form-control" readOnly />
								</Col>

								<Col>
									<label className="mb-3">Họ và tên khách hàng: (*)</label>
									<CustomSelect
										name="customer"
										options={customers}
										placeholder="Nhập để tìm"
										value={selectedCustomerOption || ""}
										onSelect={(option) => setSelectedCustomerOption(option)}
									/>

									<label className="mt-3 mb-3">Ngày bắt đầu thuê: (*)</label>
									<Field
										type="date"
										name="startDate"
										className="form-control"
										onChange={(e) => {
											setFieldValue("startDate", e.target.value);
											setFieldValue("term", calculateTerm(e.target.value, values.endDate));
										}}
									/>
									<ErrorMessage name="startDate" className="text-danger" component="div" />
								</Col>

								<Col>
									<label className="mb-3">Họ và tên nhân viên: (*)</label>
									<CustomSelect
										name="employee"
										options={employees}
										placeholder="Nhập để tìm"
										value={selectedEmployeeOption || ""}
										onSelect={(option) => setSelectedEmployeeOption(option)}
									/>

									<label className="mt-3 mb-3">Ngày kết thúc thuê: (*)</label>
									<Field
										type="date"
										name="endDate"
										className="form-control"
										onChange={(e) => {
											setFieldValue("endDate", e.target.value);
											setFieldValue("term", calculateTerm(values.startDate, e.target.value));
										}}
									/>
									<ErrorMessage name="endDate" className="text-danger" component="div" />
								</Col>
							</Row>

							<Row className="mt-4">
								<Col>
									<label>Giá tiền mỗi tháng: (VNĐ) (*)</label>
									<Field
										type="number"
										name="price"
										className="form-control mt-3"
										placeholder="Nhập giá tiền mỗi tháng"
										onChange={(e) => {
											setFieldValue("price", e.target.value);
											const total = e.target.value * values.term;
											setFieldValue("total", total);
											setFieldValue("deposit", total * 0.2);
										}}
									/>
									<ErrorMessage name="price" className="text-danger" component="div" />

									<label className="mt-3">Tiền cọc: (VNĐ)</label>
									<Field type="text" name="deposit" className="form-control mt-3" readOnly />
								</Col>

								<Col>
									<label>Tổng tiền: (VNĐ)</label>
									<Field type="text" name="total" className="form-control mt-3" readOnly />

									<label className="mt-3">Mã số thuế: (*)</label>
									<Field type="text" name="tax" className="form-control mt-3" placeholder="Nhập mã số thuế" />
									<ErrorMessage name="tax" className="text-danger" component="div" />
								</Col>
							</Row>

							<Row>
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
								<button type="button" className="btn btn-secondary" onClick={() => navigate("/contracts")}>
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

export default AddContract;
