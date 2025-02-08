import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, RouterProvider, Link, createBrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ServicesPage from "./component/services/service.page";
import Header from "./component/header/Header";
import Login from "./login-logout/Login";
import CustomerList from "./customers/components/CustomerList";
import DetailComponent from "./customers/components/DetailComponent";
import ServiceDetail from "./component/services/service.detail";
import AddComponent from "./customers/components/AddComponent";
import RegisterAccount from "./login-logout/Register";
import Facilities from "./component/Facilities";
import AddlFacilities from "./component/AddFacilities";
import EditFacilities from "./component/EditFacilities";
import DetailFacilities from "./component/DetailFacilities";
import { ToastContainer } from "react-toastify";

const LayoutAdmin = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<footer></footer>
			<ToastContainer />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		// element: <App />,
		element: <LayoutAdmin />,

		children: [
			{ index: true, element: <Login /> },
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
