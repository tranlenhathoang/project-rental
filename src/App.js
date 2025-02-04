import "./App.css";
import Header from "./component/header/Header";
import ContractList from "./contracts/components/ContractsList";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path={"/contracts"} element={<ContractList />}></Route>
			</Routes>
		</>
	);
}

export default App;
