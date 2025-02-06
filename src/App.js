import "./App.css";
import Header from "./component/header/Header";
import AddContract from "./contracts/components/AddContract";
import ContractList from "./contracts/components/ContractsList";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path={"/contracts"} element={<ContractList />}></Route>
				<Route path={"/contracts/add"} element={<AddContract />}></Route>
			</Routes>
		</>
	);
}

export default App;
