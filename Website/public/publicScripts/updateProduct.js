// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const updateButton = document.getElementById("updateButton");
	const productCategoryInput = document.getElementById("productCategory");
	const productNameText = document.getElementById("productNameText");
	const productPriceText = document.getElementById("productPriceText");
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

	const fillSelect = () => {
		fetch("/categories/get")
			.then((response) => response.json())
			.then((categories) => {
				productCategoryInput.innerHTML = "";

				categories.forEach((category) => {
					let option = document.createElement("option");
					option.value = category.id;
					option.text = category.name;
					productCategoryInput.appendChild(option);
				});
			});
	};

	const fillProductData = () => {
		fetch(`/products/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((product) => {
				productNameText.value = product.name;
				productPriceText.value = product.price;
				console.log(product.name);
				console.log(productNameText);
				productCategoryInput.value = product.categoryId;
			});
	};

	updateButton.addEventListener("click", () => {
		const name = productNameText.value;
		const price = productPriceText.value;
		const categoryId = productCategoryInput.value;
		if (isAdmin) {
			if (name && price && categoryId >= 1) {
				// Convert price to number https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
				// Look if the price has a value: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
				if (!isNaN(Number(price))) {
					fetch(
						`/products/${window.location.pathname.split("/")[3]}`,
						{
							method: "PUT",
							body: JSON.stringify({ name, price, categoryId }), // Authentification with token: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json"
							}
						}
					)
						.then((response) => response.json())
						.then((product) => {
							feedbackText.innerHTML =
								"Das Produkt wurde aktuallisiert";
						});
				} else {
					feedbackText.innerHTML =
						"Preis muss eine gültige Zahl sein";
				}
			} else {
				feedbackText.innerHTML = "Bitte füllen Sie alle Felder aus";
			}
		} else {
			feedbackText.innerHTML =
				"Sie müssen ein Admin, um Produkte zu bearbeiten";
		}
	});

	backButton.addEventListener("click", () => {
		window.location.href = `/products/show/${
			window.location.pathname.split("/")[3]
		}`;
	});

	let isAdmin = authorizeAdmin();
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

	fillSelect();
	fillProductData();
});
