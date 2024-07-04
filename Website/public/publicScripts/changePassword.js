document.addEventListener("DOMContentLoaded", () => {
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);
	changePasswordButton.addEventListener("click", () => {
		const username = document.getElementById("usernameInput").value;
		const newPassword = document.getElementById("passwordInput").value;
		const passwordConfirm = document.getElementById(
			"passwordConfirmInput"
		).value;
		if (username && newPassword && passwordConfirm) {
			if (newPassword === passwordConfirm) {
				fetch("/reset-password", {
					method: "POST",
					// JSON as body: https://;dmitripavlutin.com/fetch-with-json/
					body: JSON.stringify({ username, newPassword }),
					headers: {
						"Content-Type": "application/json"
					}
				}).then((response) => {
					if (response.ok) {
						window.location.href = "/login";
					} else {
						feedbackText.innerHTML =
							"Der Benutzer konnte nicht gefunden werden";
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
