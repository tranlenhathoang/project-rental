import React, { useEffect, useState } from "react";
import { GetfacilitiesById, Updatefacilities } from "../Function/typeFacilities";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card } from "react-bootstrap";

export default function EditFacilities() {
	const { id } = useParams();
	const [facilities, setFacilities] = useState(null);
	useEffect(() => {
		const fetchfacilities = async () => {
			try {
				const data = await GetfacilitiesById(id);
				setFacilities(data);
			} catch (error) {
				console.error("Lỗi khi lấy dữ liệu:", error);
			}
		};
		fetchfacilities();
	}, [id]);

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		console.log("Dữ liệu gửi đi:", values);
		await Updatefacilities(id, values); // Cập nhật trực tiếp dữ liệu
		console.log("----Cập nhật thành công----");
		navigate("/");
	};

	if (!facilities) {
		return <div className="text-center mt-5">Loading dữ liệu...</div>;
	}

	const validationSchema = Yup.object({
		building: Yup.string().required("Không được để trống !!!"),
		floor: Yup.string().required("Không được để trống !!!"),
		facility_type: Yup.string().required("Không được để trống !!!"),
		facility_code: Yup.string()
			.matches(/^MB\d{3}$/, "Nhập đúng định dạng: MBxxx !!!")
			.required("Không được để trống !!!"),
		status: Yup.string().required("Không được để trống !!!"),
		area: Yup.number().typeError("Phải là số !!!").positive("Diện tích phải lớn hơn 0 !!!").required("Không được để trống !!!"),
		prices: Yup.number().typeError("Phải là số !!!").positive("Giá phải lớn hơn 0 !!!"),
		management_fee: Yup.number().typeError("Phải là số !!!").positive("Phí quản lý phải lớn hơn 0 !!!"),
	});

	return (
		<div className="container mt-5">
			<Card style={{ maxWidth: "800px", margin: "auto" }}>
				<Card.Header as="h5">Chỉnh sửa thông tin Mặt Bằng</Card.Header>
				<Card.Body>
					<Formik
						initialValues={{
							building: facilities.building,
							floor: facilities.floor,
							facility_type: facilities.facility_type,
							facility_code: facilities.facility_code,
							status: facilities.status,
							area: facilities.area,
							description: facilities.description,
							prices: facilities.prices,
							management_fee: facilities.management_fee,
						}}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{({ isSubmitting }) => (
							<Form>
								<div className="mb-3">
									<label htmlFor="building" className="form-label">
										Tên tòa nhà (*)
									</label>
									<Field type="text" name="building" id="building" className="form-control" />
									<ErrorMessage name="building" component="div" className="text-danger" />
								</div>
								<div className="mb-3">
									<label htmlFor="floor" className="form-label">
										Tên Tầng (*)
									</label>
									<Field type="text" name="floor" id="floor" className="form-control" />
									<ErrorMessage name="floor" component="div" className="text-danger" />
								</div>
								<div className="mb-3">
									<label htmlFor="facility_type" className="form-label">
										Loại mặt bằng (*)
									</label>
									<Field as="select" name="facility_type" id="facility_type" className="form-control">
										<option value="">Chọn</option>
										<option value="Mặt Tiền">Mặt Tiền</option>
										<option value="Mặt Hậu">Mặt Hậu</option>
										<option value="Mặt Cắt">Mặt Cắt</option>
										<option value="Mặt Đứng">Mặt Đứng</option>
									</Field>
									<ErrorMessage name="facility_type" component="div" className="text-danger" />
								</div>

								<div className="mb-3">
									<label htmlFor="facility_code" className="form-label">
										Mã mặt bằng (*)
									</label>
									<Field type="text" name="facility_code" id="facility_code" className="form-control" />
									<ErrorMessage name="facility_code" component="div" className="text-danger" />
								</div>

								<div className="mb-3">
									<label htmlFor="status" className="form-label">
										Trạng thái
									</label>
									<Field as="select" name="status" id="status" className="form-control">
										<option value="">Chọn</option>
										<option value="Chưa Bàn Giao">Chưa Bàn Giao</option>
										<option value="Đang Vào Ở">Đang Vào Ở</option>
										<option value="Đang Sửa Chữa">Đang Sửa Chữa</option>
									</Field>
									<ErrorMessage name="status" component="div" className="text-danger" />
								</div>

								<div className="mb-3">
									<label htmlFor="area" className="form-label">
										Diện tích (*)
									</label>
									<Field type="text" name="area" id="area" className="form-control" />
									<ErrorMessage name="area" component="div" className="text-danger" />
								</div>

								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Chú thích
									</label>
									<Field as="textarea" name="description" id="description" className="form-control" />
								</div>

								<div className="mb-3">
									<label htmlFor="prices" className="form-label">
										Giá tiền
									</label>
									<Field type="text" name="prices" id="prices" className="form-control" />
									<ErrorMessage name="prices" component="div" className="text-danger" />
								</div>

								<div className="mb-3">
									<label htmlFor="management_fee" className="form-label">
										Phí quản lý
									</label>
									<Field type="text" name="management_fee" id="management_fee" className="form-control" />
									<ErrorMessage name="management_fee" component="div" className="text-danger" />
								</div>

								<div className="d-flex">
									<Button variant="primary" type="submit" disabled={isSubmitting}>
										Lưu
									</Button>
									<Link to="/floor">
										<Button variant="secondary" className="ms-2">
											Làm lại
										</Button>
									</Link>
								</div>
							</Form>
						)}
					</Formik>
				</Card.Body>
			</Card>
		</div>
	);
}
