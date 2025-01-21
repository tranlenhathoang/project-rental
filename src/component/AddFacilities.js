import React from "react";
import { useFormik } from "formik";
import axios from "axios";

function AddFacilities() {
  // Khai báo useFormik
  const formik = useFormik({
    initialValues: {
      type: "",
      area: "",
      rental_cost: "",
      max_people: "",
      room_standard: "",
      img_url: "",
      rental_type: "",
      other_services:"",  // không required
      pool_area:"",       // không required
      floors:"",          // không required
      free_services:""    // không required
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
    onSubmit: (values) => {
      // xử lý post vào API ở đây nhé:
      axios
        .post("http://localhost:8080/facilities",values)
        .then((Response) => {
          console.log("---SENTTTT---", Response.data);
        })
        .catch((error)=> {
          console.log("---loi nay: ",error)
        })
      console.log("Form values:", values);
    },
  });

  return (
    <div className="container mt-5 addfacilities-bg ">
      <h2 className="mb-4">Add a New Facility</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rental_type" className="form-label">
            Rental Type
          </label>
          <select
            name="type"
            className="form-control"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Type</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="room">Room</option>
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="text-danger">{formik.errors.type}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Area (m²)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            className="form-control"
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.area && formik.errors.area ? (
            <div className="text-danger">{formik.errors.area}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="rental_cost" className="form-label">
            Rental Cost (USD)
          </label>
          <input
            type="number"
            id="rental_cost"
            name="rental_cost"
            className="form-control"
            value={formik.values.rental_cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rental_cost && formik.errors.rental_cost ? (
            <div className="text-danger">{formik.errors.rental_cost}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="max_people" className="form-label">
            Max People
          </label>
          <input
            type="number"
            id="max_people"
            name="max_people"
            className="form-control"
            value={formik.values.max_people}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.max_people && formik.errors.max_people ? (
            <div className="text-danger">{formik.errors.max_people}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="rental_type" className="form-label">
            Rental Type
          </label>
          <select
            id="rental_type"
            name="rental_type"
            className="form-control"
            value={formik.values.rental_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select rental type</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          {formik.touched.rental_type && formik.errors.rental_type ? (
            <div className="text-danger">{formik.errors.rental_type}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="room_standard" className="form-label">
            Room Standard
          </label>
          <input
            type="text"
            id="room_standard"
            name="room_standard"
            className="form-control"
            value={formik.values.room_standard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.room_standard && formik.errors.room_standard ? (
            <div className="text-danger">{formik.errors.room_standard}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="other_services" className="form-label">
            Other Services
          </label>
          <input
            type="text"
            id="other_services"
            name="other_services"
            className="form-control"
            value={formik.values.other_services}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.other_services && formik.errors.other_services ? (
            <div className="text-danger">{formik.errors.other_services}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="pool_area" className="form-label">
            Pool Area (m²)
          </label>
          <input
            type="number"
            id="pool_area"
            name="pool_area"
            className="form-control"
            value={formik.values.pool_area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pool_area && formik.errors.pool_area ? (
            <div className="text-danger">{formik.errors.pool_area}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="floors" className="form-label">
            Floors
          </label>
          <input
            type="number"
            id="floors"
            name="floors"
            className="form-control"
            value={formik.values.floors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.floors && formik.errors.floors ? (
            <div className="text-danger">{formik.errors.floors}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="img_url" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            id="img_url"
            name="img_url"
            className="form-control"
            value={formik.values.img_url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.img_url && formik.errors.img_url ? (
            <div className="text-danger">{formik.errors.img_url}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddFacilities;