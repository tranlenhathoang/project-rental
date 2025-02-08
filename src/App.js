import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import EditComponent from "./customers/components/EditComponent";

const LayoutAdmin = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<footer></footer>
		</div>
	);
};

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<LayoutAdmin />}>
					<Route path="/login" element={<Login />} />
					<Route path={"/services"} element={<ServicesPage />}></Route>
					<Route path={"/customers"} element={<CustomerList />}></Route>
					<Route path={"/detail/:id"} element={<DetailComponent />}></Route>
					<Route path={"/add_customers"} element={<AddComponent />}></Route>
					<Route path={"/edit/:id"} element={<EditComponent />}></Route>
					<Route path="/register" element={<RegisterAccount />} />
					<Route path="/floor" element={<Facilities />} />
					<Route path="/floor/AddFacilities" element={<AddFacilities />} />
					<Route path="/floor/facilities/:id/edit" element={<EditFacilities />} />
					<Route path="/floor/facilities/:id" element={<DetailFacilities />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
