document.addEventListener("DOMContentLoaded", () => {
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
	const registerButton = document.getElementById("registerButton");
	registerButton.addEventListener("click", () => {
		const username = document.getElementById("usernameInput").value;
		const password = document.getElementById("passwordInput").value;
		const passwordConfirm = document.getElementById(
			"passwordConfirmInput"
		).value;
		if (username && password && passwordConfirm) {
			if (password === passwordConfirm) {
				fetch("/api/register", {
					method: "POST",
					// JSON as body: https://;dmitripavlutin.com/fetch-with-json/
					body: JSON.stringify({ username, password }),
					headers: {
						"Content-Type": "application/json"
					}
				}).then((response) => {
					if (response.ok) {
						window.location.href = "/login";
					} else {
						console.log(response.ok);
						feedbackText.innerHTML =
							"Ein Benutzer mit diesem Namen existiert bereits";
					}
				});
			} else {
				feedbackText.innerHTML = "Passwörter stimmen nicht überein";
			}
		} else {
			feedbackText.innerHTML = "Füllen Sie bitte alle Felder aus";
		}
	});
});
