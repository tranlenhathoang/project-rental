import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./customers/CustomerList";

function App() {
	return (
		<>
			<Routes>
				<Route path={"/"} element={<CustomerList />}></Route>
			</Routes>
		</>
	);
}

export default App;
