import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchFacilityById,updateFacilityById } from "../Function/typeFacilities";

const EditFacilities = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Dùng navigate thay vì history.push
  const [facility, setFacility] = useState(null);

  // Tải dữ liệu facility từ API
  useEffect(() => {
    const fetchFacility = async () => {
      const data = await fetchFacilityById(id);
      setFacility(data);
    };
    fetchFacility();
  }, [id]);

  // Formik để xử lý form
  const formik = useFormik({
    enableReinitialize: true, // Khi dữ liệu facility thay đổi, form sẽ tự động cập nhật
    initialValues: {
      type: facility ? facility.type : "",
      area: facility ? facility.area : "",
      rental_cost: facility ? facility.rental_cost : "",
      max_people: facility ? facility.max_people : "",
      room_standard: facility ? facility.room_standard : "",
      img_url: facility ? facility.img_url : "",
      rental_type: facility ? facility.rental_type : "",
      pool_area: facility ? facility.pool_area : "",
      floors: facility ? facility.floors : "",
      other_services: facility ? facility.other_services : "",
      free_services: facility ? facility.free_services : "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.type) {
        errors.type = "Required";
      }
      if (!values.area) {
        errors.area = "Required";
      }
      if (!values.rental_cost) {
        errors.rental_cost = "Required";
      }
      if (!values.max_people) {
        errors.max_people = "Required";
      }
      if (!values.room_standard) {
        errors.room_standard = "Required";
      }
      if (!values.img_url) {
        errors.img_url = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await updateFacilityById(id, values);
      navigate(`/facilities/${id}`);
    },
  });

  // Nếu chưa tải xong facility, hiển thị loading
  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Chỉnh Sửa Facility</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.type && formik.errors.type && (
            <div className="text-danger">{formik.errors.type}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="area" className="form-label">Area (m²)</label>
          <input
            type="number"
            id="area"
            name="area"
            className="form-control"
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.area && formik.errors.area && (
            <div className="text-danger">{formik.errors.area}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="rental_cost" className="form-label">Rental Cost (USD)</label>
          <input
            type="number"
            id="rental_cost"
            name="rental_cost"
            className="form-control"
            value={formik.values.rental_cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rental_cost && formik.errors.rental_cost && (
            <div className="text-danger">{formik.errors.rental_cost}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="max_people" className="form-label">Max People</label>
          <input
            type="number"
            id="max_people"
            name="max_people"
            className="form-control"
            value={formik.values.max_people}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.max_people && formik.errors.max_people && (
            <div className="text-danger">{formik.errors.max_people}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="room_standard" className="form-label">Room Standard</label>
          <input
            type="text"
            id="room_standard"
            name="room_standard"
            className="form-control"
            value={formik.values.room_standard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.room_standard && formik.errors.room_standard && (
            <div className="text-danger">{formik.errors.room_standard}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="img_url" className="form-label">Image URL</label>
          <input
            type="url"
            id="img_url"
            name="img_url"
            className="form-control"
            value={formik.values.img_url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.img_url && formik.errors.img_url && (
            <div className="text-danger">{formik.errors.img_url}</div>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFacilities;
