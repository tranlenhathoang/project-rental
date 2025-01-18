import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
  const account  = useSelector(state => state.user.account)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleShowDrop = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="bg-body-tertiary">
        <div className="container-fluid d-flex align-items-center justify-content-between py-2">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <h1 className="m-0">FLC</h1>
          </div>

          {/* Navigation */}
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
                  <Link to="#" className="nav-link">
                    Trang Chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    Giới Thiệu
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    onClick={handleShowDrop}
                    style={{ cursor: "pointer" }}
                  >
                    Khai Thác-Vận Hành
                  </span>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu show">
                      {/* Dropdown: Quản lý Toà Nhà */}
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

                      {/* Dropdown: Quản lý khách hàng */}
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
                  <Link to="#" className="nav-link">
                    Tin Tức
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    {account && account.name}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
