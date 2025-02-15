import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/accountAction";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../LogoDiamondTime.png";

const Header = () => {
	const account = useSelector((state) => state.user.account);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	// Trạng thái hiển thị submenu
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<>
			{account && (
				<Navbar bg="white" expand="lg" variant="light" className="shadow-sm py-3">
					<Container>
						{/* Logo */}
						<Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-dark">
							<img src={Logo} alt="logo" className="imgLogo" style={{ width: "20%" }} />
						</Navbar.Brand>

						{/* Toggle button cho mobile */}
						<Navbar.Toggle aria-controls="navbar-nav" />

						{/* Navbar Content */}
						<Navbar.Collapse id="navbar-nav">
							<Nav className="ms-auto fs-5" style={{ whiteSpace: "noWrap" }}>
								<Nav.Link as={Link} to="/" className="text-dark mx-2">
									Trang Chủ
								</Nav.Link>
								<Nav.Link as={Link} to="/services" className="text-dark mx-2">
									Dịch vụ
								</Nav.Link>
								{account?.role === "ADMIN" && (
									<Nav.Link as={Link} to="/customers" className="text-dark mx-2">
										Khách hàng
									</Nav.Link>
								)}
								<Nav.Link as={Link} to="/floor" className="text-dark mx-2">
									Mặt bằng
								</Nav.Link>

								{/* Dropdown */}
								<NavDropdown
									title="Người dùng"
									id="dropdownOperations"
									show={isDropdownOpen}
									onMouseEnter={() => setIsDropdownOpen(true)}
									onMouseLeave={() => setIsDropdownOpen(false)}
								>
									<NavDropdown.Item as={Link} to="/building">
										Toà nhà
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/contracts">
										Hợp đồng
									</NavDropdown.Item>
								</NavDropdown>

								{/* Avatar & Logout */}
								<NavDropdown
									title={
										<Image
											src={account?.avatar || "https://via.placeholder.com/50"}
											roundedCircle
											width={40}
											height={40}
											className="border border-primary"
											style={{
												objectFit: "cover",
											}}
										/>
									}
									align="end"
									id="dropdownAvatar"
								>
									<NavDropdown.Item onClick={handleLogout} className="text-danger">
										Đăng xuất
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>
	);
};

export default Header;
