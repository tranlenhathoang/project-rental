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

export async function searchCustomerByName(name, contractId, status) {
	try {
		let response = [];
		if (contractId && status) {
			response = await axios.get(`${BASE_URL}/customer?contractId=${contractId}&name_like=${name}&status=${status}&_expand=contract`);
		} else if (contractId) {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&contractId=${contractId}&_expand=contract`);
		} else if (status) {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&status=${status}&_expand=contract`);
		} else {
			response = await axios.get(`${BASE_URL}/customer?name_like=${name}&_expand=contract`);
		}
		return response.data;
	} catch (error) {}
}
