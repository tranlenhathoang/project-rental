import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllContracts() {
	try {
		const response = await axios.get(`${BASE_URL}/contracts`);
		return response.data;
	} catch (error) {}
}
