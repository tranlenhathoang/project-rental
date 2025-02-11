import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllEmployee() {
	try {
		const response = await axios.get(`${BASE_URL}/employees`);
		return response.data;
	} catch (error) {}
}
