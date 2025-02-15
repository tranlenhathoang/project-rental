import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { getCustomerById, updateCustomer } from "../apiProject/customerService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditComponent() {
	const [customer, setCustomer] = useState(null);
	//null để lấy lại dữ liệu
	const { id } = useParams();
	console.log("id", id);

	useEffect(() => {
		const fetchCustomer = async () => {
			const data = await getCustomerById(id);
			setCustomer(data);
			console.log(data);
		};
		fetchCustomer();
	}, [id]);

	const navigate = useNavigate();
	const handleSubmit = async (value) => {
		const customer = {
			...value,
		};
		await updateCustomer(customer.id, customer);
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
		navigate(`/customers`);
	};
	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Tên khách hàng là bắt buộc")
			.matches(/^[A-ZÀ-Ỹa-zà-ỹ]+(\s[A-ZÀ-Ỹa-zà-ỹ]+)*$/, "Tên không đúng định dạng"),
		identity: Yup.string()
			.matches(/^\d{12}$/, "CMND phải bao gồm đúng 12 chữ số")
			.required("Số chứng minh thư là bắt buộc"),
		email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
		phone: Yup.string()
			.required("Số điện thoại là bắt buộc")
			.matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
		address: Yup.string().required("Địa chỉ là bắt buộc"),
		company: Yup.string().required("Tên công ty là bắt buộc"),
		dob: Yup.date().required("Ngày sinh là bắt buộc"),
	});
	if (!customer) {
		return <div className="container">Đang tải dữ liệu...</div>;
	}
	return (
		<div className="container d-flex justify-content-center align-items-center mt-5">
			<div className="card p-4 shadow" style={{ width: "1000px" }}>
				<h3 className="text-center text-success mb-4">Chỉnh sửa thông tin khách hàng</h3>
				<Formik initialValues={customer} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
					<Form>
						<div className="mb-3">
							<label className="form-label">Tên khách hàng (*):</label>
							<Field type="text" name="name" className="form-control" placeholder="Tên khách hàng" />
							<ErrorMessage name="name" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Số chứng minh thư (*):</label>
							<Field type="text" name="identity" className="form-control" placeholder="Số chứng minh nhân dân" />
							<ErrorMessage name="identity" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Email (*):</label>
							<Field type="email" name="email" className="form-control" placeholder="Email" />
							<ErrorMessage name="email" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Ngày sinh (*):</label>
							<Field type="date" name="dob" className="form-control" />
							<ErrorMessage name="dob" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Số điện thoại (*):</label>
							<Field type="text" name="phone" className="form-control" placeholder="Số điện thoại" />
							<ErrorMessage name="phone" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Địa chỉ (*):</label>
							<Field type="text" name="address" className="form-control" placeholder="Địa chỉ" />
							<ErrorMessage name="address" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Website:</label>
							<Field type="text" name="website" className="form-control" placeholder="Website" />
							<ErrorMessage name="website" component="div" className="text-danger" />
						</div>

						<div className="mb-3">
							<label className="form-label">Tên công ty (*):</label>
							<Field type="text" name="company" className="form-control" placeholder="Tên công ty" />
							<ErrorMessage name="company" component="div" className="text-danger" />
						</div>

						<div className="d-flex justify-content-center">
							<button type="submit" className="btn btn-success px-5 form-control">
								Lưu
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
export default EditComponent;
