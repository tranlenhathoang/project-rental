import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addNewCustomer } from "../apiProject/customerService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddComponent() {
	const [customer, setCustomer] = useState({
		name: "",
		identity: "",
		email: "",
		phone: "",
		address: "",
		website: "",
		company: "",
		dob: "",
	});

	const navigate = useNavigate();
	const handleSubmit = async (value) => {
		const customer = {
			...value,
			// date: new Date(value.date).toLocaleDateString("vi-VN", {
			// 	day: "2-digit",
			// 	month: "2-digit",
			// 	year: "numeric",
			// }),
		};
		//Gọi hàm toLocaleDateString để định dạng ngày theo chuẩn vi-VN (Tiếng Việt)
		//day: "2-digit": Ngày được hiển thị với 2 chữ số (ví dụ: 05 thay vì 5).
		//month: "2-digit": Tháng cũng hiển thị với 2 chữ số.
		//year: "numeric": Hiển thị năm đầy đủ 4 chữ số (ví dụ: 2025).
		await addNewCustomer(customer);
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
		navigate("/customers");
	};
	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Tên khách hàng là bắt buộc")
			.matches(/^[A-ZÀ-Ỹ[a-zà-ỹ]*(\s[A-ZÀ-Ỹ[a-zà-ỹ]*)+$/, "Tên không đúng định dạng"),
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
	return (
		<div className="container d-flex justify-content-center align-items-center mt-5">
			<div className="card p-4 shadow" style={{ width: "1000px" }}>
				<h3 className="text-center text-success mb-4">Thêm mới khách hàng</h3>
				<Formik initialValues={customer} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
export default AddComponent;
