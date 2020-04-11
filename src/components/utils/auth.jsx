import {
	getFromStorage
} from "./storage";

export const VerifyToken = () => {
	const token = getFromStorage("moocer");
	if (!token) {
		return false;
	}
	return true;
}

export const GetToken = () => {
	return getFromStorage("moocer");
}