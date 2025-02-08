// import "./App.css";

// function App() {
// 	return <h1>Trang chu</h1>;
// }

// export default App;

import "./App.css";
import Login from "./login-logout/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterAccount from "./login-logout/Register";
import Header from "./component/header/Header";
import ServicesPage from "./component/services/service.page";
import AddContract from "./contracts/components/AddContract";
import ContractList from "./contracts/components/ContractsList";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<RegisterAccount />} />
				<Route path="/trangchu" element={<Header />} />
				<Route path="/services" element={<ServicesPage />} />
				<Route path={"/contracts"} element={<ContractList />}></Route>
				<Route path={"/contracts/add"} element={<AddContract />}></Route>
			</Routes>
		</>
	);
}

export default App;
