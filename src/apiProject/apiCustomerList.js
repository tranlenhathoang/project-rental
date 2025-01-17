import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer() {
	try {
		const response = await axios.get(`${BASE_URL}/customerList`);
		return response.data; // trả về cả danh sách khách hàng và tổng số bản ghi
	} catch (e) {
		return {};
	}
}
export async function searchByName(name, identity) {
	try {
		const response = await axios.get(`${BASE_URL}/customerList?name_like=${name}&identity_like=${identity}`);
		return response.data;
	} catch (e) {
		return [];
	}
}
