// Whole Script: Copied and modified from https://github.com/BitSparkCode/online-shop-api
document.addEventListener("DOMContentLoaded", () => {
	const productNameText = document.getElementById("productName");
	const productPriceText = document.getElementById("productPrice");
	const productCategoryText = document.getElementById("productCategory");
	const updateProductButton = document.getElementById("updateProductButton");
	const deleteProductButton = document.getElementById("deleteProductButton");
	const token = localStorage.getItem("token");
	const feedbackText = document.getElementById("feedbackText");
	const placeholder = document.getElementById("placeholder");
	feedbackText.innerHTML = "";
	const loginLogout = document.getElementById("loginLogout");

	const logoutButton = document.getElementById("logoutButton");
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);

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
		placeholder.remove();
	}

	const fetchProduct = () => {
		fetch(`/products/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((product) => {
				document.title = product.name;
				productNameText.innerHTML = "";
				productPriceText.innerHTML = "";
				productCategoryText.innerHTML = "";
				fetch(`/categories/${product.categoryId}`)
					.then((response) => response.json())
					.then((category) => {
						productNameText.innerHTML = product.name;
						productPriceText.innerHTML = product.price + " CHF";
						productCategoryText.innerHTML = category.name;
						updateProductButton.addEventListener("click", () => {
							window.location.href = `/products/edit/${product.id}`;
						});
					});
			});
	};

	const deleteProduct = () => {
		if (isAdmin) {
			fetch(`/products/${window.location.pathname.split("/")[3]}`, {
				method: "DELETE",
				// Authentification with token: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then(() => {
				localStorage.setItem(
					"productsFeedback",
					"Produkt wurde gelöscht"
				);
				window.location.href = "/products";
			});
		} else {
			feedbackText.innerHTML =
				"Sie müssen ein Admin sein, um Produkte zu löschen";
		}
	};

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
					isAdmin = true;
				} else {
					isAdmin = false;
				}
			}
		} catch {
			isAdmin = false;
		} finally {
			if (!isAdmin) {
				updateProductButton.style.display = "none";
				deleteProductButton.style.display = "none";
				placeholder.remove();
			}
		}
	}

	fetchProduct();
	deleteProductButton.addEventListener("click", deleteProduct);
	authorizeAdmin();
});
