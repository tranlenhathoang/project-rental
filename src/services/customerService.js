import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllCustomer() {
	try {
		const response = await axios.get(`${BASE_URL}/customerList`);
		return response.data;
	} catch (e) {
		return [];
	}
}
