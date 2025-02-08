import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllPremises() {
	try {
		const response = await axios.get(`${BASE_URL}/premises`);
		return response.data;
	} catch (error) {}
}
