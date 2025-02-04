import "./App.css";
import ContractList from "./contracts/components/ContractsList";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Routes>
				<Route path={"/"} element={<ContractList />}></Route>
			</Routes>
		</>
	);
}

export default App;
