// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const categoryList = document.getElementById("categoryList");
	const token = localStorage.getItem("token");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = localStorage.getItem("categoriesFeedback");
	localStorage.removeItem("categoriesFeedback");
	const createButton = document.getElementById("createButton");
	const logoutButton = document.getElementById("logoutButton");
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);
	const loginLogout = document.getElementById("loginLogout");

	logoutButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		location.reload();
	});

	changePasswordButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		window.location.href = "/change-password";
	});

	if (!token) {
		loginLogout.innerHTML = `<a href="/login">Anmelden</a>`;
		createButton.style.display = "none";
	}

	const fetchCategories = () => {
		fetch("/categories/get")
			.then((response) => response.json())
			.then((categories) => {
				categoryList.innerHTML = "";

				categories.forEach((category) => {
					categoryList.innerHTML += `<a class="container-sm border border-3 border-dark-subtle bg-light row py-3 text-dark text-decoration-none" href="categories/show/${category.id}">
									<div class="col">
										<h1 class="text-center">${category.name}</h1>
									</div>

								</a>`;
				});
			});
	};

	fetchCategories();
});
