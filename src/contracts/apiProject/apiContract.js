import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllContract(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&_expand=premises&_expand=customer`);
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}

export async function changeStatus(id, status) {
	try {
		const response = await axios.patch(`${BASE_URL}/contracts/${id}`, { status: status });
		return response.data;
	} catch (error) {}
}

export async function search(customerId, premisesId, status, page, limit) {
	try {
		let response = [];
		if (premisesId && status && customerId) {
			response = await axios.get(
				`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&premisesId=${premisesId}&customerId=${customerId}&status=${status}&_expand=premises&_expand=customer`
			);
		} else if (premisesId && status) {
			response = await axios.get(
				`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&premisesId=${premisesId}&status=${status}&_expand=premises&_expand=customer`
			);
		} else if (customerId && status) {
			response = await axios.get(
				`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&customerId=${customerId}&status=${status}&_expand=premises&_expand=customer`
			);
		} else if (customerId && premisesId) {
			response = await axios.get(
				`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&customerId=${customerId}&premisesId=${premisesId}&_expand=premises&_expand=customer`
			);
		} else if (premisesId) {
			response = await axios.get(`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&premisesId=${premisesId}&_expand=premises&_expand=customer`);
		} else if (status) {
			response = await axios.get(`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&status=${status}&_expand=premises&_expand=customer`);
		} else {
			response = await axios.get(`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&customerId=${customerId}&_expand=premises&_expand=customer`);
		}
		return [response.data, response.headers["x-total-count"]];
	} catch (error) {}
}

export async function addNewContract(contract) {
	try {
		const response = await axios.post(`${BASE_URL}/contracts`, contract);
		return response.data;
	} catch (error) {}
}

export async function deleteById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/contracts/${id}`);
		return response.data;
	} catch (error) {}
}

export async function getContractById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/contracts/${id}?_expand=premises&_expand=customer&_expand=employee`);
		return response.data;
	} catch (error) {}
}

export async function updateContract(id, contract) {
	try {
		const response = await axios.put(`${BASE_URL}/contracts/${id}`, contract);
		return response.data;
	} catch (error) {}
}
