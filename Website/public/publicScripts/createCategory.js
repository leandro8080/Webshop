// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const createButton = document.getElementById("createButton");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
	const logoutButton = document.getElementById("logoutButton");
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);
	let isAdmin;
	async function authorizeAdmin() {
		try {
			const response = await fetch("/api/isAdmin", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				if (data === "admin") {
					return true;
				} else {
					return false;
				}
			}
		} catch {
			return false;
		}
	}
	authorizeAdmin();

	const token = localStorage.getItem("token");

	const loginLogout = document.getElementById("loginLogout");

	if (!token) {
		loginLogout.innerHTML = `<a href="/login">Anmelden</a>`;
	}

	logoutButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		location.reload();
	});

	changePasswordButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		window.location.href = "/change-password";
	});

	createButton.addEventListener("click", () => {
		const name = document.getElementById("categoryNameText").value;
		const token = localStorage.getItem("token");
		if (isAdmin) {
			if (name) {
				fetch(`/categories`, {
					method: "POST",
					body: JSON.stringify({ name }),
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					}
				})
					.then((response) => response.json())
					.then((category) => {
						feedbackText.innerHTML = `Die Kategorie "${category.name}" wurde erstellt.`;
						document.getElementById("categoryNameText").value = "";
					});
			} else {
				feedbackText.innerHTML = "Geben Sie bitte einen Namen an";
			}
		} else {
			feedbackText.innerHTML =
				"Sie müssen ein Admin sein, um eine Kategorie zu erstellen";
		}
	});
});
