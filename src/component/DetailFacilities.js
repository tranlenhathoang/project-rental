import { GetfacilitiesById } from "../Function/typeFacilities";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function DetailFacilities() {
  const { id } = useParams(); // Lấy id từ URL
  const [facilities, setFacilities] = useState([]); // 🔥 Đổi từ object thành array

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await GetfacilitiesById(id);
        if (data) {
          setFacilities(Array.isArray(data) ? data : [data]); // 🔥 Đảm bảo dữ liệu luôn là mảng
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchFacilities();
  }, [id]);

  if (!facilities || facilities.length === 0) {
    return <div>Đang tải dữ liệu hoặc không có dữ liệu...</div>; // 🔥 Kiểm tra dữ liệu trước khi render
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">DANH SÁCH MẶT BẰNG</h2>
      <Link to="/floor">
                    <Button variant="primary" className="ms-2">
                      Quay Lại
                    </Button>
                  </Link>
      <div className="table-responsive">
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
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id}>
                <td>{facility.facility_code}</td>
                <td>{facility.facility_type}</td>
                <td>{facility.area}</td>
                <td>{facility.status || "N/A"}</td>
                <td>{facility.prices}</td>
                <td>{facility.management_fee}</td>
                <td>{facility.customer || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailFacilities;
