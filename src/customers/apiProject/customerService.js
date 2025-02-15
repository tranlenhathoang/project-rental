import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/customers?_page=${page}&_limit=${limit}`);
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords]; // trả về cả danh sách khách hàng và tổng số bản ghi
	} catch (e) {
		return {};
	}
}
export async function searchByName(name, identity, phone, page, limit) {
	try {
		let response = [];

		if (name || identity || phone) {
			response = await axios.get(
				`${BASE_URL}/customers?_page=${page}&_limit=${limit}&name_like=${name}&identity_like=${identity}&phone_like=${phone}`
			);
		} else {
			response = await axios.get(`${BASE_URL}/customers?_page=${page}&_limit=${limit}`);
		}

		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {
		return [];
	}
}

export async function addNewCustomer(customer) {
	try {
		const response = await axios.post(`${BASE_URL}/customers`, customer);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function getCustomerById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/customers/${id}`);
		return response.data;
	} catch (e) {}
}

export async function deleteCustomerById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/customers/${id}`);
		return response.data;
	} catch (e) {
		return null;
	}
}

export async function updateCustomer(id, customer) {
	try {
		const response = await axios.put(`${BASE_URL}/customers/${id}`, customer);
		return response.data;
	} catch (e) {
		return null;
	}
}
