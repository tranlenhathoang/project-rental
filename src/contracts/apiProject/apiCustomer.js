import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/customer?_page=${page}&_limit=${limit}&_expand=premises`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}

export async function changeStatus(id, status) {
	try {
		const response = await axios.patch(`${BASE_URL}/customer/${id}`, { status: status });
		return response.data;
	} catch (error) {}
}

export async function searchCustomerByName(name, premisesId, status) {
	try {
		let response = [];
		if (premisesId && status) {
			response = await axios.get(`${BASE_URL}/customer?premisesId=${premisesId}&name_like=${name}&status=${status}&_expand=premises`);
		} else if (premisesId) {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&premisesId=${premisesId}&_expand=premises`);
		} else if (status) {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&status=${status}&_expand=premises`);
		} else {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&_expand=premises`);
		}
		return response.data;
	} catch (error) {}
}
