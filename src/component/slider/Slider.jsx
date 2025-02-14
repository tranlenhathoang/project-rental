import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./slider.css";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
const Slider = () => {
	const [listPremises, setListPremises] = useState([]);
	const fetchListPremises = async () => {
		const res = await axios.get(`http://localhost:3001/premises`);
		// console.log(">>>check res", res);
		if (!res) {
			toast.error("error fetch data");
		}
		setListPremises(res.data);
	};

	useEffect(() => {
		fetchListPremises();
	}, []);

	return (
		<>
			<div className="slider-container">
				<Carousel data-bs-theme="dark">
					{listPremises.length > 0 &&
						listPremises.map((item) => {
							return (
								<Carousel.Item key={item.id}>
									<img className="d-block" src={item?.src} alt="First slide" />
									<Carousel.Caption>
										<h5>{item?.title}</h5>
										<p>{item?.desc}</p>
									</Carousel.Caption>
								</Carousel.Item>
							);
						})}
				</Carousel>
			</div>
			<div>
				<div className="text-center py-4">
					<h4>Cập nhật những thông tin mới nhất</h4>
					<h2>TIN TỨC - SỰ KIỆN</h2>
				</div>
			</div>
			<div className="container">
				<Row xs={1} md={3} className="g-4">
					{Array.from({ length: 6 }).map((_, idx) => (
						<Col key={idx}>
							<Card>
								<Card.Img variant="top" src="holder.js/100px160" />
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<div className="d-flex justify-content-center">
					<Link
						className="btn btn-warning fw-bold d-flex align-items-center justify-content-center mt-4 mb-4 rounded-4"
						style={{
							backgroundColor: "#E5A63B",
							color: "white",
							border: "none",
							width: "150px",
							height: "60px",
							borderRadius: "0",
							fontSize: "16px",
						}}
						to={"/"}
					>
						Xem thêm <FaChevronRight className="ms-2" />
					</Link>
				</div>
			</div>
			<div className="container pb-5 ">
				<Card className="text-black shadow-sm" style={{ minHeight: "300px", backgroundColor: "#f2f2f2", border: "none" }}>
					<Row className="g-0 align-items-center">
						<Col md={7}>
							<Card.Body className="p-5">
								<Card.Title className="fw-bold" style={{ fontSize: "48px", color: "#452d14" }}>
									Mang không gian chuyên nghiệp và thoải mái tới khách hàng
								</Card.Title>
								<br />
								<Card.Text style={{ textAlign: "justify" }}>
									Mang phong cách kiến trúc hiện đại, Tòa nhà phức hợp Diamond Time – 35 Thái Phiên – Đà Nẵng sở hữu nội thất gỗ tự nhiên được thiết
									kế tinh tế, trau chuốt tỉ mỉ đảm bảo mang đến sự hài lòng cho khách hàng.
								</Card.Text>
							</Card.Body>
						</Col>

						{/* Cột nội dung */}
						<Col md={5}>
							<Card.Body>
								<Card.Title className="fw-bold">4.5062m2 Tổng diện tích sử dụng</Card.Title>
								<br />
								<br />
								<br />
								<Card.Text className="ms-5">
									<p>Tầng 1: Trung tâm thương mại, giải trí, nhà hàng và coffee shop</p>
									<p>Tầng 2: Căn hộ dịch vụ</p>
									<p>Tầng 3: Tiktak Co-woking Space</p>
								</Card.Text>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</div>

			<div className="container pb-5 ">
				<Card className="bg-white text-black shadow-sm" style={{ minHeight: "300px", border: "none" }}>
					<Row className="g-0 align-items-center">
						<Col md={5}>
							<Card.Img
								src="https://via.placeholder.com/600x300" // Thay ảnh thực tế
								alt="Card Image"
								style={{ height: "100%", width: "100%", objectFit: "cover" }}
							/>
						</Col>

						{/* Cột nội dung */}
						<Col md={7}>
							<Card.Body>
								<Card.Title className="fw-bold" style={{ fontSize: "48px", color: "#452d14" }}>
									Vị thế trung tâm nâng tầm thương hiệu
								</Card.Title>
								<br />

								<Card.Text style={{ textAlign: "justify" }}>
									Tọa lạc tại 35 Thái Phiên, quận Hải Châu – trung tâm thành phố, nơi có sự phát triển sầm uất bậc nhất Đà Nẵng, DIAMOND TIME sở hữu
									vị trí “vàng” với hai mặt tiền, thuận tiện cho việc giao thương và di chuyển.
								</Card.Text>
								<Row>
									<Col>Vị trí thuận tiện</Col>
									<Col>Kết nối doanh nghiệp</Col>
								</Row>
								<br />
								<Card.Text style={{ textAlign: "justify" }}>
									Tọa lạc tại 35 Thái Phiên, quận Hải Châu – trung tâm thành phố, nơi có sự phát triển sầm uất bậc nhất Đà Nẵng, DIAMOND TIME sở hữu
									vị trí “vàng” với hai mặt tiền, thuận tiện cho việc giao thương và di chuyển.
								</Card.Text>

								<Link
									className="btn btn-warning fw-bold d-flex align-items-center justify-content-center mt-4 mb-4 rounded-4"
									style={{
										backgroundColor: "#E5A63B",
										color: "white",
										border: "none",
										width: "150px",
										height: "60px",
										borderRadius: "0",
										fontSize: "16px",
									}}
									to={"/"}
								>
									Xem chi tiết <FaChevronRight className="ms-2" />
								</Link>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</div>

			<div className="container pb-5">
				<Card className="bg-white text-black shadow-lg" style={{ minHeight: "400px", border: "none" }}>
					{/* Hiển thị hình ảnh nền */}
					<Card.Img
						src="https://files.oaiusercontent.com/file-2x1Lrmq5Mrrcv1NqBua3Cc?se=2025-02-13T19%3A42%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dbe03c19b-a4b7-4015-b941-b04e15a31946.webp&sig=9IhTyGHG4fCVlBwT9qUBlTW5QE51KbJB/kFeeXAdwJo%3D"
						alt="Bàn họp hình chữ nhật"
						style={{ objectFit: "cover", height: "400px", filter: "brightness(0.6)" }} // Làm tối ảnh
					/>

					{/* Lớp phủ nền mờ */}
					<Card.ImgOverlay className="d-flex align-items-center justify-content-center" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
						<div className="text-center text-white">
							<Card.Title className="fw-bold fs-3">QUÝ KHÁCH MUỐN THAM QUAN TRẢI NGHIỆM TẠI DIAMOND TIME</Card.Title>
							<hr style={{ width: "50px", margin: "10px auto" }} />
							<Card.Text>Hãy liên hệ ngay để biết thêm thông tin chi tiết!</Card.Text>
							<div className="mt-3 d-flex justify-content-center">
								<button className="btn-phone rounded-pill">
									<FaPhone className="icon" />
									<span className="btn-text">0813.06.16.36</span>
								</button>
							</div>
						</div>
					</Card.ImgOverlay>
				</Card>
			</div>
		</>
	);
};

export default Slider;
