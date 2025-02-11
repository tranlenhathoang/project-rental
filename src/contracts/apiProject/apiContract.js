import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllContract(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/contracts?_page=${page}&_limit=${limit}&_expand=premises&_expand=customer`);
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
