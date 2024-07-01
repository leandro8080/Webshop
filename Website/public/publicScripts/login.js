document.addEventListener("DOMContentLoaded", () => {
	const usernameInput = document.getElementById("usernameInput");
	const passwordInput = document.getElementById("passwordInput");
	const loginButton = document.getElementById("loginButton");
	const feedbackText = document.getElementById("feedbackText");

	feedbackText.innerHTML = "";

	// Help from Mister Maier
	loginButton.addEventListener("click", async () => {
		const username = usernameInput.value;
		const password = passwordInput.value;
		const response = await fetch("/api/login", {
			method: "POST",
			// JSON as body: https://dmitripavlutin.com/fetch-with-json/
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("token", data.token);
			window.location.href = "/products";
		} else if (response.status === 401) {
			feedbackText.innerHTML = "Benutzername oder Passwort falsch";
		} else {
			feedbackText.innerHTML = "Ein Fehler ist aufgetreten";
		}
	});
});
