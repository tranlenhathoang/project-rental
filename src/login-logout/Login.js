import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "../apiProject/ApiLogin";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useDispatch } from "react-redux";
import { login } from "../redux/accountAction";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const handleSubmit = async (value) => {
    const { name, password } = value;
    const result = await checkLogin(name, password);
    if (result) {
      toast.success("Đăng nhập thành công");
      navigate("/");
      dispatch(login(result))
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };
  const handleValidate = Yup.object({
    name: Yup.string().required("Tên đăng nhập không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });
  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Cột bên trái - Chào mừng */}
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h1 className="display-4 text-primary">Chào mừng bạn đến với tòa nhà</h1>
            <p className="lead">
              Đăng nhập để trải nghiệm các dịch vụ và tiện ích hàng đầu của chúng tôi.
            </p>
          </div>
        </div>

        {/* Cột bên phải - Form đăng nhập */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center text-secondary">Đăng Nhập</h3>
              <Formik
                initialValues={user}
                onSubmit={handleSubmit}
                validationSchema={handleValidate}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Tên Đăng Nhập:
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mật khẩu:
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Đăng nhập
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <Link to="/register" className="text-decoration-none">
                      Chưa có tài khoản? Đăng ký ngay
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
