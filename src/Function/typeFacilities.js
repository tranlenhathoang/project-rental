import axios from "axios";

// Lấy danh sách các facilities với hỗ trợ phân trang
export const fetchFacilities = async (page = 1, itemsPerPage = 6) => {
  try {
    const response = await axios.get("http://localhost:8080/facilities", {
      params: {
        _page: page, // Số trang
        _limit: itemsPerPage, // Số mục trên mỗi trang
      },
    });

    // Tổng số mục từ header `x-total-count`
    const totalItems = parseInt(response.headers["x-total-count"], 10) || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      items: response.data, // Danh sách facilities
      totalPages, // Tổng số trang
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu facilities:", error);
    return {
      items: [],
      totalPages: 0,
    };
  }
};

// Xử lý xóa facility
export const handleDeleteFacility = async (id, facilities, setFacilities) => {
  try {
    await axios.delete(`http://localhost:8080/facilities/${id}`);
    setFacilities(facilities.filter((facility) => facility.id !== id));
  } catch (error) {
    console.error("Lỗi khi xóa facility:", error);
  }
};

// Xử lý lấy detail dữ liệu
export const fetchFacilityById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/facilities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching facility: ", error);
    return null;
  }
};

// Xử lý cập nhật facility
export const updateFacilityById = async (id, values) => {
  try {
    await axios.put(`http://localhost:8080/facilities/${id}`, values);
  } catch (error) {
    console.error("Error updating facility: ", error);
  }
};

// Hàm xử lý tìm kiếm theo type và room_standard với phân trang
export async function searchFacilityByName(searchType, searchRoom, page = 1, itemsPerPage = 6) {
  try {
    let query = "";

    if (searchType) query += `type_like=${searchType}`;
    if (searchRoom) query += (query ? "&" : "") + `room_standard_like=${searchRoom}`;

    const response = await axios.get(`http://localhost:8080/facilities`, {
      params: {
        _page: page, // Số trang
        _limit: itemsPerPage, // Số mục trên mỗi trang
        ...query.split("&").reduce((acc, q) => {
          const [key, value] = q.split("=");
          acc[key] = value;
          return acc;
        }, {}),
      },
    });

    // Tổng số mục từ header `x-total-count`
    const totalItems = parseInt(response.headers["x-total-count"], 10) || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      items: response.data, // Danh sách facilities
      totalPages, // Tổng số trang
    };
  } catch (e) {
    console.log("Lỗi: " + e);
    return {
      items: [],
      totalPages: 0,
    };
  }
}
