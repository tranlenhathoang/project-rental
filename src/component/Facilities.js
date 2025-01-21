import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchFacilities, handleDeleteFacility, searchFacilityByName } from "../Function/typeFacilities";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]); // Danh sách facilities
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    const searchRef1 = useRef();
    const searchRef2 = useRef();
    const searchRef3 = useRef();
    const searchRef4 = useRef();


    // Tải dữ liệu facilities khi component được render
    useEffect(() => {
        loadFacilities(currentPage);
    }, [currentPage]);

    const loadFacilities = async (page) => {
        console.log("Đang tải trang:", page);
        const data = await fetchFacilities(page);
        console.log("Dữ liệu nhận được:", data);
        setFacilities(data.items);
        setTotalPages(data.totalPages);
    };


    const handleSearch = async () => {
        const search1 = searchRef1.current.value.trim(); // Tìm kiếm theo tên tầng
        const search2 = searchRef2.current.value.trim(); // Tìm kiếm theo mã mặt
        const search3 = searchRef3.current.value.trim(); // Tìm kiếm theo diện tích
        const search4 = searchRef4.current.value.trim(); // Tìm kiếm theo loại mặt
        const page = 1; // Tìm kiếm bắt đầu từ trang 1
        const data = await searchFacilityByName(search1, search2, search3, search4, page); // Gọi hàm tìm kiếm với các tham số chính xác
        setFacilities(data.items); // Gán danh sách facilities từ kết quả tìm kiếm
        setTotalPages(data.totalPages); // Gán tổng số trang từ kết quả tìm kiếm
        setCurrentPage(page); // Reset trang hiện tại về 1
    };


    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">DANH SÁCH MẶT BẰNG</h2>
            <div className="input-group mb-3">
                <input ref={searchRef1} name={"search"} placeholder={"Tìm kiếm theo tên tầng"} className="form-control" />
                <input ref={searchRef2} name={"search2"} placeholder={"Tìm kiếm theo mã mặt"} className="form-control" />
                <input ref={searchRef3} name={"search3"} placeholder={"Tìm kiếm theo diện tích"} className="form-control" />
                <input ref={searchRef4} name={"search4"} placeholder={"Tìm kiếm theo loại mặt"} className="form-control" />

                <button className="input-group-text btn btn-primary" onClick={handleSearch}>
                    SEARCH
                </button>
            </div>
            <div className="table-responsive">
                <Link to={`/AddFacilities`} className="btn btn-success btn-sm me-2">Thêm mới</Link>
                <button className="btn btn-danger btn-sm me-2">Xóa tất cả</button>
                <button className="btn btn-danger btn-sm">Tên tầng</button>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Mã mặt bằng</th>
                            <th>Loại mặt bằng</th>
                            <th>Diện tích</th>
                            <th>Trạng thái</th>
                            <th>Giá bán</th>
                            <th>Phi quản lý</th>
                            <th>Khach hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <tr key={facility.id}>
                                    <td>{facility.facility_code}</td>
                                    <td>{facility.facility_type}</td>
                                    <td>{facility.area}</td>
                                    <td>{facility.status || "N/A"}</td>
                                    <td>{facility.prices}</td>
                                    <td>{facility.management_fee}</td>
                                    <td>{facility.customer || ""}</td>
                                    <td>
                                        <Link to={`/facilities/${facility.id}`} className="btn btn-info btn-sm me-2">
                                            Xem
                                        </Link>
                                        <Link to={`/facilities/${facility.id}`} className="btn btn-warning btn-sm me-2">
                                            Sửa
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteFacility(facility.id, facilities, setFacilities)}
                                        >
                                            Xóa
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Không tìm thấy phòng nào!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li
                            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <button className="page-link">Trang trước</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li
                                key={page}
                                className={`page-item ${currentPage === page ? "active" : ""}`}
                                onClick={() => handlePageChange(page)}
                            >
                                <button className="page-link">{page}</button>
                            </li>
                        ))}
                        <li
                            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <button className="page-link">Trang sau</button>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default Facilities;
