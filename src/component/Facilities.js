import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllfacilities, deleteFacilitiesById } from "../Function/typeFacilities";
import Pagination from "react-bootstrap/Pagination";
import { Modal, Button } from "react-bootstrap";

const Facilities = () => {
	const [facilities, setFacilities] = useState([]);
	const [searchFloor, setSearchFloor] = useState("");
	const [searchCode, setSearchCode] = useState("");
	const [searchArea, setSearchArea] = useState("");
	const [searchType, setSearchType] = useState("");
	const [filteredFacilities, setFilteredFacilities] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;
	const totalPage = Math.ceil(filteredFacilities.length / itemsPerPage);

	useEffect(() => {
		loadFacilities();
	}, []);

	useEffect(() => {
		const filteredData = facilities.filter(
			(facility) =>
				(facility.floor?.toLowerCase().includes(searchFloor.toLowerCase()) || searchFloor === "") &&
				(facility.premisesname?.toLowerCase().includes(searchCode.toLowerCase()) || searchCode === "") &&
				(facility.area.toString().includes(searchArea) || searchArea === "") &&
				((typeof facility.facility_type === "string" && facility.facility_type.toLowerCase().includes(searchType.toLowerCase())) || searchType === "")
		);
		setFilteredFacilities(filteredData);
	}, [searchFloor, searchCode, searchArea, searchType, facilities]);

	const confirmDelete = (id) => {
		setDeleteId(id);
		setShowModal(true);
	};
	const handleDelete = async () => {
		if (deleteId) {
			await deleteFacilitiesById(deleteId);
			setFacilities(facilities.filter((facility) => facility.id !== deleteId));
			setShowModal(false);
		}
	};
	const handleClose = () => setShowModal(false);

	const loadFacilities = async () => {
		try {
			const data = await GetAllfacilities();
			setFacilities(data || []);
			setFilteredFacilities(data || []);
		} catch (error) {
			console.error("Lỗi khi tải dữ liệu facilities:", error);
		}
	};

	const handleFirst = () => setCurrentPage(1);
	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPage));
	const handleLast = () => setCurrentPage(totalPage);

	const currentItems = filteredFacilities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div className="container mt-4">
			<h2 className="text-center mb-5">DANH SÁCH MẶT BẰNG</h2>
			<div className="d-flex mb-3">
				<input
					type="text"
					className="form-control me-2"
					placeholder="Tìm kiếm theo tên tầng"
					value={searchFloor}
					onChange={(e) => setSearchFloor(e.target.value)}
				/>
				<input
					type="text"
					className="form-control me-2"
					placeholder="Tìm kiếm theo mã mặt bằng"
					value={searchCode}
					onChange={(e) => setSearchCode(e.target.value)}
				/>
				<input
					type="text"
					className="form-control me-2"
					placeholder="Tìm kiếm theo diện tích"
					value={searchArea}
					onChange={(e) => setSearchArea(e.target.value)}
				/>
				<input
					type="text"
					className="form-control me-2"
					placeholder="Tìm kiếm theo loại mặt bằng"
					value={searchType}
					onChange={(e) => setSearchType(e.target.value)}
				/>
			</div>
			<div className="table-responsive">
				<Link to={`/floor/AddFacilities`} className="btn btn-success me-2 gap-2 mb-3">
					Thêm mới
				</Link>
				<button className="btn btn-danger me-2 gap-2 mb-3">Xóa tất cả</button>
				<button className="btn btn-danger gap-2 mb-3">Tên tầng</button>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th className="text-center">Mã mặt bằng</th>
							<th className="text-center">Loại mặt bằng</th>
							<th className="text-center">Diện tích</th>
							<th className="text-center">Trạng thái</th>
							<th className="text-center">Giá bán</th>
							<th className="text-center">Phí quản lý</th>
							<th className="text-center">Khách hàng</th>
							<th className="text-center">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.length > 0 ? (
							currentItems.map((facility) => (
								<tr key={facility.id}>
									<td>{facility.premisesName}</td>
									<td>{facility.facility_type}</td>
									<td className="text-end">{facility.area}</td>
									<td>{facility.status || "N/A"}</td>
									<td className="text-end">{facility.prices}</td>
									<td className="text-end">{facility.management_fee}</td>
									<td>{facility.customer || ""}</td>
									<td>
										<Link to={`/floor/facilities/${facility.id}`} className="btn btn-primary me-2">
											Xem
										</Link>
										<Link to={`/floor/facilities/${facility.id}/edit`} className="btn btn-warning me-2">
											Sửa
										</Link>
										<button type="button" className="btn btn-danger" onClick={() => confirmDelete(facility.id)}>
											Xóa
										</button>

									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="8" className="text-center">
									Không tìm thấy phòng nào!
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<Pagination className="container my-4 d-flex justify-content-center">
					<Pagination.First onClick={handleFirst} disabled={currentPage === 1}>
						Trang đầu
					</Pagination.First>
					<Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
					{[...Array(totalPage || 0)].map((_, index) => (
						<Pagination.Item key={index} active={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</Pagination.Item>
					))}
					<Pagination.Next onClick={handleNext} disabled={currentPage === totalPage} />
					<Pagination.Last onClick={handleLast} disabled={currentPage === totalPage}>
						Trang cuối
					</Pagination.Last>
				</Pagination>
			</div>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận xóa</Modal.Title>
				</Modal.Header>
				<Modal.Body>Bạn có chắc chắn muốn xóa mặt bằng này không?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Hủy</Button>
					<Button variant="danger" onClick={handleDelete}>Xóa</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Facilities;
