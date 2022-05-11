const getMockAPI = async () => {
	try {
		const response = await fetch(
			"https://627a7f5a73bad506858a4485.mockapi.io/api/testAPI/5"
		);

		if (!response.ok) {
			throw new Error("Problème " + response.status);
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

// getMockAPI();

const postMockAPI = async () => {
	try {
		const response = await fetch(
			"https://627a7f5a73bad506858a4485.mockapi.io/api/testAPI",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					image: "test",
					avatar: "test",
					name: "Jean-Louis",
				}),
			}
		);

		console.log(response);

		if (!response.ok) {
			throw new Error("Problème " + response.status);
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

const putMockAPI = async () => {
	try {
		const response = await fetch(
			"https://627a7f5a73bad506858a4485.mockapi.io/api/testAPI/7",
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					image: "Ceci a été modifié",
					avatar: "test",
					name: "Jean-Louis",
				}),
			}
		);

		console.log(response);

		if (!response.ok) {
			throw new Error("Problème " + response.status);
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

const deleteMockAPI = async () => {
	try {
		const response = await fetch(
			"https://627a7f5a73bad506858a4485.mockapi.io/api/testAPI/7",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					image: "Ceci a été modifié",
					avatar: "test",
					name: "Jean-Louis",
				}),
			}
		);

		console.log(response);

		if (!response.ok) {
			throw new Error("Problème " + response.status);
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

// postMockAPI();
// putMockAPI();
// deleteMockAPI();
