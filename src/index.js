import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider, createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import ServicesPage from "./component/services/service.page";
import Header from "./component/header/Header";
import Login from "./login-logout/Login";
import CustomerList from "./customers/components/CustomerList";
import DetailComponent from "./customers/components/DetailComponent";
import ServiceDetail from "./component/services/service.detail";
import AddComponent from "./customers/components/AddComponent";
import EditComponent from "./customers/components/EditComponent";
import RegisterAccount from "./login-logout/Register";
import Facilities from "./component/Facilities";
import AddlFacilities from "./component/AddFacilities";
import EditFacilities from "./component/EditFacilities";
import DetailFacilities from "./component/DetailFacilities";
import ContractList from "./contracts/components/ContractsList";
import AddContract from "./contracts/components/AddContract";
import { ToastContainer } from "react-toastify";
import App from "./App";
import EditContract from "./contracts/components/EditContract";
import DetailContract from "./contracts/components/DetailContract";
import Footer from "./component/footer/Footer";

const LayoutAdmin = () => {
	const navigate = useNavigate();
	const account = useSelector((state) => state?.accountReducer?.account);

	useEffect(() => {
		if (!account) {
			navigate("/login");
		}
	}, [account, navigate]);

	return (
		<div>
			<Header />

			<Outlet />
			<Footer></Footer>
			<ToastContainer />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutAdmin />,
		children: [
			{ index: true, element: <App /> },
			{
				path: "/services",
				element: <ServicesPage />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/customers",
				element: <CustomerList />,
			},
			{
				path: "/detail/:id",
				element: <DetailComponent />,
			},
			{
				path: "/edit/:id",
				element: <EditComponent />,
			},
			{
				path: "/services/:id",
				element: <ServiceDetail />,
			},
			{
				path: "/add_customers",
				element: <AddComponent />,
			},
			{
				path: "/register",
				element: <RegisterAccount />,
			},
			{
				path: "/floor",
				element: <Facilities />,
			},
			{
				path: "/floor/AddFacilities",
				element: <AddlFacilities />,
			},
			{
				path: "/floor/facilities/:id/edit",
				element: <EditFacilities />,
			},
			{
				path: "/floor/facilities/:id",
				element: <DetailFacilities />,
			},
			{
				path: "/contracts",
				element: <ContractList />,
			},
			{
				path: "/contracts/add",
				element: <AddContract />,
			},
			{
				path: "/contracts/edit/:id",
				element: <EditContract />,
			},
			{
				path: "/contracts/detail/:id",
				element: <DetailContract />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
