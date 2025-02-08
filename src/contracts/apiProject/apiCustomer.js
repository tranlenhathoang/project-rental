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

export async function search(customerId, premisesId, status) {
	try {
		let response = [];
		if (premisesId && status && customerId) {
			response = await axios.get(
				`${BASE_URL}/contracts?premisesId=${premisesId}&customerId=${customerId}&status=${status}&_expand=premises&_expand=customer`
			);
		} else if (premisesId && status) {
			response = await axios.get(`${BASE_URL}/contracts?premisesId=${premisesId}&status=${status}&_expand=premises&_expand=customer`);
		} else if (customerId && status) {
			response = await axios.get(`${BASE_URL}/contracts?customerId=${customerId}&status=${status}&_expand=premises&_expand=customer`);
		} else if (customerId && premisesId) {
			response = await axios.get(`${BASE_URL}/contracts?customerId=${customerId}&premisesId=${premisesId}&_expand=premises&_expand=customer`);
		} else if (premisesId) {
			response = await axios.get(`${BASE_URL}/contracts?premisesId=${premisesId}&_expand=premises&_expand=customer`);
		} else if (status) {
			response = await axios.get(`${BASE_URL}/contracts?status=${status}&_expand=premises&_expand=customer`);
		} else {
			response = await axios.get(`${BASE_URL}/contracts?customerId=${customerId}&_expand=premises&_expand=customer`);
		}
		return response.data;
	} catch (error) {}
}
