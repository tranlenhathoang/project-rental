
import "./App.css";
import Login from "./login-logout/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterAccount from "./login-logout/Register";
import Header from "./component/header/Header";
import ServicesPage from "./component/services/service.page";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterAccount />} />
        <Route path="/trangchu" element={<Header />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </>
  );
}

export default App;
