// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const productsList = document.getElementById("productsList");
	const createButton = document.getElementById("createButton");
	const feedbackText = document.getElementById("feedbackText");
	const token = localStorage.getItem("token");
	feedbackText.innerHTML = localStorage.getItem("productsFeedback");
	localStorage.removeItem("productsFeedback");
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

	const fetchProducts = () => {
		fetch("/products/get")
			.then((response) => response.json())
			.then((products) => {
				productsList.innerHTML = "";

				products.forEach((product) => {
					fetch(`/categories/${product.categoryId}`)
						.then((response) => response.json())
						.then((category) => {
							productsList.innerHTML += `
								<a class="container-sm border border-3 border-dark-subtle bg-light row py-3 text-dark text-decoration-none" href="products/show/${product.id}">
									<div class="col">
										<h1 class="text-center">${product.name}</h1>
									</div>
									<div class="col">
										<h1 class="text-center">${category.name}</h1>
									</div>
									<div class="col">
										<h1 class="text-center">${product.price} CHF</h1>
									</div>
								</a>`;
						});
				});
			});
	};

	fetchProducts();
});
