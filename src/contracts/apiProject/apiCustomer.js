import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer() {
	try {
		const response = await axios.get(`${BASE_URL}/customers`);
		return response.data;
	} catch (error) {}
}

export async function changeStatus(id, status) {
	try {
		const response = await axios.patch(`${BASE_URL}/customers/${id}`, { status: status });
		return response.data;
	} catch (error) {}
}
