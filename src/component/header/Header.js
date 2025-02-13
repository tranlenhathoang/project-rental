import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/accountAction";

const Header = () => {
	const account = useSelector((state) => state.user.account);
	console.log(account);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [avarOpen, setAvarOpen] = useState(false);
	const handleShowDrop = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const handleShow = () => {
		setAvarOpen(!avarOpen);
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<>
			{!account ? (
				<></>
			) : (
				<header className="d-flex">
					<div className="">
						<h1 className="p-5">FLC</h1>
					</div>
					<div className="container-fluid d-flex align-items-center fs-4">
						<nav className="navbar navbar-expand-lg">
							<button
								className="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarNavDropdown"
								aria-controls="navbarNavDropdown"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNavDropdown">
								<ul className="navbar-nav">
									<li className="nav-item">
										<Link to="/" className="nav-link">
											Trang Chủ
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/services" className="nav-link">
											Dịch vụ
										</Link>
									</li>
									{account?.role === "ADMIN" && (
										<li className="nav-item">
											<Link to="/customers" className="nav-link">
												Khách hàng
											</Link>
										</li>
									)}
									<li className="nav-item">
										<Link to="/floor" className="nav-link">
											Mặt bằng
										</Link>
									</li>
									<li className="nav-item">
										<span className="nav-link dropdown-toggle" role="button" onClick={handleShowDrop} style={{ cursor: "pointer" }}>
											Người dùng
										</span>
										{isDropdownOpen && (
											<ul className="dropdown-menu show">
												<li>
													<Link
														to="#submenuBuilding"
														className="dropdown-item"
														data-bs-toggle="collapse"
														role="button"
														aria-expanded="false"
														aria-controls="submenuBuilding"
													>
														Quản lý Toà Nhà
													</Link>
													<div className="collapse" id="submenuBuilding">
														<ul className="list-unstyled ps-3">
															<li>
																<Link to="/building" className="nav-link">
																	Toà Nhà
																</Link>
															</li>
															<li>
																<Link to="/floor" className="nav-link">
																	Mặt Bằng
																</Link>
															</li>
														</ul>
													</div>
												</li>
												<li>
													<Link
														to="#submenuCustomer"
														className="dropdown-item"
														data-bs-toggle="collapse"
														role="button"
														aria-expanded="false"
														aria-controls="submenuCustomer"
													>
														Quản lý khách hàng
													</Link>
													<div className="collapse" id="submenuCustomer">
														<ul className="list-unstyled ps-3">
															<li>
																<Link to="/customers" className="nav-link">
																	Khách Hàng
																</Link>
															</li>
															<li>
																<Link to="/contracts" className="nav-link">
																	Hợp Đồng
																</Link>
															</li>
														</ul>
													</div>
												</li>
											</ul>
										)}
									</li>
									<li className="nav-item">
										<span className="nav-link dropdown-toggle" role="button" onClick={handleShow} style={{ cursor: "pointer" }}>
											<img src={account.avatar} alt="avatar" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} />
											{avarOpen && (
												<ul className="dropdown-menu show">
													<li>
														<span
															to="#submenuBuilding"
															className="dropdown-item"
															// data-bs-toggle="collapse"
															role="button"
															aria-expanded="false"
															aria-controls="submenuBuilding"
														>
															Đăng xuất
														</span>
													</li>
												</ul>
											)}
										</span>
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</header>
			)}
		</>
	);
};
export default Header;
