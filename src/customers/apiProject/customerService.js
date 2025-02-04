import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/customerList?_page=${page}&_limit=${limit}`);
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords]; // trả về cả danh sách khách hàng và tổng số bản ghi
	} catch (e) {
		return {};
	}
}
export async function searchByName(name, identity, phone) {
	try {
		let response = [];
		if ((name, identity, phone)) {
			response = await axios.get(`${BASE_URL}/customerList?name_like=${name}&identity_like=${identity}&phone=${phone}`);
		} else if (name) {
			response = await axios.get(`${BASE_URL}/customerList?name_like=${name}`);
		} else if (identity) {
			response = await axios.get(`${BASE_URL}/customerList?identity_like=${identity}`);
		} else if (phone) {
			response = await axios.get(`${BASE_URL}/customerList?phone=${phone}`);
		} else {
			response = await axios.get(`${BASE_URL}/customerList`);
		}

		return response.data;
	} catch (e) {
		return [];
	}
}

export async function addNewCustomer(customer) {
	try {
		const response = await axios.post(`${BASE_URL}/customerList`, customer);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function getCustomerById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/customerList/${id}`);
		return response.data;
	} catch (e) {}
}
