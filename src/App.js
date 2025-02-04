import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./customers/components/CustomerList";
import Header from "./component/header/Header";
import ServiceTable from "./component/services/service.table";

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path={"/customers"} element={<CustomerList />}></Route>
				<Route path={"/services"} element={<ServiceTable />}></Route>
			</Routes>
		</>
	);
}

export default App;
