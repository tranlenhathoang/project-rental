import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../apiProject/customerService";

function DetailComponent() {
	const [customerDetail, setCustomerDetail] = useState({
		name: "",
		identity: "",
		email: "",
		phone: "",
		address: "",
		website: "",
		company: "",
		date: "",
	});

	const { id } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const detail = await getCustomerById(id);
			setCustomerDetail(detail);
		};
		fetchData();
	}, [id]);

	return (
		<div>
			{/* Header */}
			<div
				className="text-center py-4"
				style={{
					backgroundColor: "#e3f2fd",
					color: "#0056b3",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h2 className="fw-bold">THÔNG TIN KHÁCH HÀNG</h2>
				<p className="mb-0">Cập nhật thông tin chi tiết khách hàng</p>
			</div>

			<Container className="mt-5">
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Tên khách hàng (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.name} readOnly />
						</div>
					</Col>

					<Col md={6}>
						<div>
							<label className="form-label">Số CMND (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.identity} readOnly />
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Email (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.email} readOnly />
						</div>
					</Col>
					<Col md={6}>
						<div>
							<label className="form-label">Ngày sinh (*):</label>
							<input type="date" id="disabledTextInput" className="form-control" value={customerDetail.date} readOnly />
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Số điện thoại (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.phone} readOnly />
						</div>
					</Col>
					<Col md={6}>
						<div>
							<label className="form-label">Địa chỉ (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.address} readOnly />
						</div>
					</Col>
				</Row>

				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Website (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.website} readOnly />
						</div>
					</Col>
					<Col md={6}>
						<div>
							<label className="form-label">Công ty (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.company} readOnly />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default DetailComponent;
