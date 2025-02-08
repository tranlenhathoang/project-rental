import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllfacilities, deleteFacilitiesById } from "../Function/typeFacilities";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]); // Danh sách facilities
    const [searchFloor, setSearchFloor] = useState(""); // Từ khóa tìm kiếm theo tên tầng
    const [searchCode, setSearchCode] = useState(""); // Từ khóa tìm kiếm theo mã mặt bằng
    const [searchArea, setSearchArea] = useState(""); // Từ khóa tìm kiếm theo diện tích
    const [searchType, setSearchType] = useState(""); // Từ khóa tìm kiếm theo loại mặt bằng
    const [filteredFacilities, setFilteredFacilities] = useState([]); // Danh sách mặt bằng sau khi lọc
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage, setItemsPerPage] = useState(6); // Số mục mỗi trang

    // Tải dữ liệu facilities khi component được render
    useEffect(() => {
        loadFacilities();
    }, []);

    useEffect(() => {
        // Lọc danh sách khi có thay đổi trong search terms
        const filteredData = facilities.filter(facility =>
            (facility.floor?.toLowerCase().includes(searchFloor.toLowerCase()) || searchFloor === "") &&
            (facility.facility_code?.toLowerCase().includes(searchCode.toLowerCase()) || searchCode === "") &&
            (facility.area.toString().includes(searchArea) || searchArea === "") && // Bỏ toLowerCase() ở đây
            (typeof facility.facility_type === 'string' && facility.facility_type.toLowerCase().includes(searchType.toLowerCase()) || searchType === "")
        );
        
        // Nếu không có tìm kiếm, hiển thị tất cả danh sách
        setFilteredFacilities(filteredData);
    }, [searchFloor, searchCode, searchArea, searchType, facilities]);

    const handleDelete = async (id) => {
        await deleteFacilitiesById(id);
        setFacilities(facilities.filter((facility) => facility.id !== id));
    };

    const loadFacilities = async () => {
        try {
            console.log("Đang tải danh sách mặt bằng...");
            const data = await GetAllfacilities();
            console.log("Dữ liệu nhận được:", data);
            setFacilities(data || []); // Gán danh sách facilities
            setFilteredFacilities(data || []); // Gán danh sách sau khi lọc ban đầu
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu facilities:", error);
        }
    };

    // Xử lý phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFacilities.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <h2 className="text-center">DANH SÁCH MẶT BẰNG</h2>
            <div className="d-flex mb-3">
                {/* Input tìm kiếm theo tên tầng */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Tìm kiếm theo tên tầng"
                    value={searchFloor}
                    onChange={(e) => setSearchFloor(e.target.value)} // Cập nhật từ khóa tìm kiếm theo tên tầng
                />
                {/* Input tìm kiếm theo mã mặt bằng */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Tìm kiếm theo mã mặt bằng"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)} // Cập nhật từ khóa tìm kiếm theo mã mặt bằng
                />
                {/* Input tìm kiếm theo diện tích */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Tìm kiếm theo diện tích"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)} // Cập nhật từ khóa tìm kiếm theo diện tích
                />
                {/* Input tìm kiếm theo loại mặt bằng */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Tìm kiếm theo loại mặt bằng"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)} // Cập nhật từ khóa tìm kiếm theo loại mặt bằng
                />
            </div>
            <div className="table-responsive">
                <Link to={`/floor/AddFacilities`} className="btn btn-success btn-sm me-2">Thêm mới</Link>
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
                            <th>Phí quản lý</th>
                            <th>Khách hàng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((facility) => (
                                <tr key={facility.id}>
                                    <td>{facility.facility_code}</td>
                                    <td>{facility.facility_type}</td>
                                    <td>{facility.area}</td>
                                    <td>{facility.status || "N/A"}</td>
                                    <td>{facility.prices}</td>
                                    <td>{facility.management_fee}</td>
                                    <td>{facility.customer || ""}</td>
                                    <td>
                                        <Link to={`/floor/facilities/${facility.id}`} className="btn btn-info btn-sm me-2">
                                            Xem
                                        </Link>
                                        <Link to={`/floor/facilities/${facility.id}/edit`} className="btn btn-warning btn-sm me-2">
                                            Sửa
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm" onClick={() => handleDelete(facility.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">Không tìm thấy phòng nào!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Phân trang */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredFacilities.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-secondary'} btn-sm me-2`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Facilities;
