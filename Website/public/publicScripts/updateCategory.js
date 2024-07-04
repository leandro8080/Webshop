// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const updateButton = document.getElementById("updateButton");
	const categoryNameText = document.getElementById("categoryNameText");
	const backButton = document.getElementById("backButton");
	const token = localStorage.getItem("token");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
	const logoutButton = document.getElementById("logoutButton");
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);
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

	const fillCategorytData = () => {
		fetch(`/categories/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((category) => {
				categoryNameText.value = category.name;
			});
	};

	updateButton.addEventListener("click", () => {
		const name = categoryNameText.value;
		if (token) {
			if (name) {
				fetch(`/categories/${window.location.pathname.split("/")[3]}`, {
					method: "PUT",
					body: JSON.stringify({ name }),
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					}
				})
					.then((response) => response.json())
					.then((product) => {
						feedbackText.innerHTML =
							"Die Kategorie wurde aktualisiert";
					});
			} else {
				feedbackText.innerHTML = "Geben Sie bitte einen Namen an";
			}
		} else {
			feedbackText.innerHTML =
				"Sie müssen sich authentifizieren, um eine Kategorie zu bearbeiten";
		}
	});

	backButton.addEventListener("click", () => {
		window.location.href = `/categories/show/${
			window.location.pathname.split("/")[3]
		}`;
	});

	fillCategorytData();
});
