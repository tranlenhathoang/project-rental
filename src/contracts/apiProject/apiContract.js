import axios from "axios";
import { BASE_URL } from "./api";

export async function addNewContract(contract) {
	try {
		const response = await axios.post(`${BASE_URL}/contract`, contract);
		return response.data;
	} catch (error) {}
}
