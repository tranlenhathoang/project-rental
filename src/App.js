import "./App.css";
import Login from "./login-logout/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterAccount from "./login-logout/Register";
import Header from "./component/header/Header";
import ServicesPage from "./component/services/service.page";
import Facilities from "./component/Facilities"; // Đường dẫn tới Facilities
import AddFacilities from "./component/AddFacilities";
import DetailFacilities from "./component/DetailFacilities";
import EditFacilities from "./component/EditFacilities";
import CustomerList from "./customers/components/CustomerList";
import Header from "./component/header/Header";
import ServiceTable from "./component/services/service.table";
import AddComponent from "./customers/components/AddComponent";
import { ToastContainer } from "react-toastify";
import DetailComponent from "./customers/components/DetailComponent";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterAccount />} />
        <Route path="/trangchu" element={<Header />} />
        <Route path="/floor" element={<Facilities />} />
        <Route path="/floor/AddFacilities" element = {<AddFacilities />} />
        <Route path="/floor/facilities/:id" element = {<DetailFacilities />} />
        <Route path="/floor/facilities/:id/edit" element = {<EditFacilities />} />
				<Route path={"/customers"} element={<CustomerList />}></Route>
				<Route path={"/services"} element={<ServiceTable />}></Route>
				<Route path={"/add_customers"} element={<AddComponent />}></Route>
				<Route path={"/detail/:id"} element={<DetailComponent />}></Route>
			</Routes>
		</>
	);
}

export default App;