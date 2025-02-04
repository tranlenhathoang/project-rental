import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
			<div className="d-flex align-items-center mb-4">
				<div className="flex-grow-1 text-center mt-4">
					<h4>THÔNG TIN KHÁCH HÀNG</h4>
				</div>
			</div>

			<Container className="mt-5">
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Tên khách hàng (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.name} />
						</div>
					</Col>

					<Col md={6}>
						<div>
							<label className="form-label">Số CMND (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.identity} />
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Email (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.email} />
						</div>
					</Col>

					<Col md={6}>
						<div>
							<label className="form-label">Số điện thoại (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.phone} />
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Địa chỉ (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.address} />
						</div>
					</Col>

					<Col md={6}>
						<div>
							<label className="form-label">Website (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.website} />
						</div>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6}>
						<div>
							<label className="form-label">Công ty (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.company} />
						</div>
					</Col>

					<Col md={6}>
						<div>
							<label className="form-label">Ngày thành lập (*):</label>
							<input type="text" id="disabledTextInput" className="form-control" value={customerDetail.date} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default DetailComponent;
