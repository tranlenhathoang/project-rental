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
export async function searchByName(name, phone, identity) {
	try {
		const response = await axios.get(`${BASE_URL}/customerList?name_like=${name}&phone=${phone}&identity_like=${identity}`);
		return response.data;
	} catch (e) {
		return [];
	}
}
