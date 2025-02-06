import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./customers/components/CustomerList";
import Header from "./component/header/Header";
import ServiceTable from "./component/services/service.table";
import AddComponent from "./customers/components/AddComponent";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path={"/customers"} element={<CustomerList />}></Route>
				<Route path={"/services"} element={<ServiceTable />}></Route>
				<Route path={"/add_customers"} element={<AddComponent />}></Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
