import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/customer?_page=${page}&_limit=${limit}&_expand=contract`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}

export async function changeStatus(id, status) {
	try {
		const response = await axios.patch(`${BASE_URL}/customer/${id}`, { status: status });
		return response.data;
	} catch (error) {}
}
