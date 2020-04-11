export function getFromStorage(key) {
	if (!key) {
		return null;
	}

	try {
		const valueStr = sessionStorage.getItem(key);
		if (valueStr) {
			return JSON.parse(valueStr);
		}
		return null;
	} catch (err) {
		return null;
	}
}

export function setInStorage(key, obj) {
	if (!key) {
		console.log("Error: token is missing");
	}

	try {
		sessionStorage.setItem(key, JSON.stringify(obj));
	} catch (err) {
		console.log(err);
	}
}

export function deleteFromStorage(key) {
	if (!key) {
		console.log("Error: token is missing");
	}

	try {
		sessionStorage.removeItem(key);
	} catch (err) {
		console.log(err);
	}
}