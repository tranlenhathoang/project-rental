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
import { FaComputer } from "react-icons/fa6";
import { FaPeopleArrows } from "react-icons/fa6";
import { Modal, Button } from "react-bootstrap";

const Slider = () => {
	const [listPremises, setListPremises] = useState([]);
	const [information, setInformation] = useState([]);
	const [card, setCard] = useState([]);
	const [show, setShow] = useState(false);
	const fetchListPremises = async () => {
		const res = await axios.get(`http://localhost:3001/premises`);
		// console.log(">>>check res", res);
		if (!res) {
			toast.error("error fetch data");
		}
		setListPremises(res.data);
	};
	const fetchInformation = async () => {
		const fetch = await axios.get(`http://localhost:3001/information`);
		setInformation(fetch.data);
	};
	const fetchCard = async () => {
		const fetchCard = await axios.get(`http://localhost:3001/card`);
		setCard(fetchCard.data);
	};

	useEffect(() => {
		fetchListPremises();
		fetchInformation();
		fetchCard();
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
					{information &&
						information.map((i) => (
							<Col key={i.id} information={i}>
								<Card style={{ border: "none" }}>
									<Card.Img
										variant="top"
										src={i.imgSrc}
										alt={i.imgAlt}
										style={{
											height: "200px",
											objectFit: "cover",
										}}
									/>
									<Card.Body>
										<Card.Title>{i.title}</Card.Title>
										<Card.Text>{i.text}</Card.Text>
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
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} //Dùng window.scrollTo({ top: 0, behavior: "smooth" }) để cuộn lên đầu trang một cách mượt mà.
					>
						Xem thêm <FaChevronRight className="ms-2" />
					</Link>
				</div>
			</div>

			<div className="container pb-5">
				<Card className="text-black shadow-sm" style={{ minHeight: "300px", backgroundColor: "#f2f2f2", border: "none" }}>
					{card &&
						card.map((c) => (
							<Row className="g-0 align-items-center" key={c.id}>
								{/* Cột bên trái (Nội dung chính) */}
								<Col md={7}>
									<div
										className="position-absolute top-0 end-0 p-3 text-white"
										style={{
											backgroundColor: "#E5A63B",
											width: "250px",
											textAlign: "center",
										}}
									>
										<h4 className="fw-bold">{c.superficies}m2</h4>
										<p className="mb-0">Tổng diện tích sử dụng</p>
									</div>
									<Card.Body className="p-5">
										<Card.Title className="fw-bold" style={{ fontSize: "48px", color: "#452d14" }}>
											Mang không gian chuyên nghiệp và thoải mái tới khách hàng
										</Card.Title>
										<br />
										<Card.Text style={{ textAlign: "justify" }}>
											Mang phong cách kiến trúc hiện đại, Tòa nhà phức hợp Diamond Time – 35 Thái Phiên – Đà Nẵng sở hữu nội thất gỗ tự nhiên được
											thiết kế tinh tế, trau chuốt tỉ mỉ đảm bảo mang đến sự hài lòng cho khách hàng.
										</Card.Text>
									</Card.Body>
								</Col>

								{/* Cột bên phải (Thông tin thêm) */}
								<Col md={5}>
									<Card.Body>
										<br />
										<br />
										<Card.Text className="ms-5">
											{c.text1}
											<br />
											{c.text2}
											<br />
											{c.text3}
										</Card.Text>
									</Card.Body>
								</Col>
							</Row>
						))}
				</Card>
			</div>

			<div className="container pb-5 ">
				<Card className="bg-white text-black shadow-sm" style={{ minHeight: "300px", border: "none" }}>
					<Row className="g-0 align-items-center">
						<Col md={5}>
							<Card.Img
								src="https://diamondtime.vn/wp-content/uploads/2021/06/image-311.jpg"
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
									<Col>
										<FaComputer color="#E5A63B" size={"70"} className="me-2" />
										Vị trí thuận tiện
									</Col>
									<Col>
										<FaPeopleArrows color="#E5A63B" size={"70"} className="me-2" />
										Kết nối doanh nghiệp
									</Col>
								</Row>
								<br />
								<Card.Text style={{ textAlign: "justify" }}>
									Tọa lạc tại 35 Thái Phiên, quận Hải Châu – trung tâm thành phố, nơi có sự phát triển sầm uất bậc nhất Đà Nẵng, DIAMOND TIME sở hữu
									vị trí “vàng” với hai mặt tiền, thuận tiện cho việc giao thương và di chuyển.
								</Card.Text>

								<button
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
									onClick={() => setShow(true)}
								>
									Xem chi tiết <FaChevronRight className="ms-2" />
								</button>
								<Modal show={show} onHide={() => setShow(false)} size="lg" centered>
									<Modal.Header closeButton>
										<Modal.Title>Vị trí trên Google Maps</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<iframe
											title="Google Maps"
											width="100%"
											height="400"
											style={{ border: 0 }}
											allowFullScreen
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.060004971111!2d108.21995747608702!3d16.068430584622766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c805a7701d%3A0x1a3241a3c2a39558!2zMzUgVGjDoWkgUGhpw6puLCBI4bqjaSBDaGF1LCDEkMOgIE5hbmc!5e0!3m2!1sen!2s!4v1707912345678"
										></iframe>
									</Modal.Body>
								</Modal>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</div>

			<div className="pb-5">
				<Card className="bg-white text-black shadow-lg" style={{ minHeight: "400px", border: "none" }}>
					{/* Hiển thị hình ảnh nền */}
					<Card.Img
						src="https://mychair.vn/wp-content/uploads/2023/11/ban-hop-hinh-chu-nhat-lam-bang-go-3.jpg"
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
