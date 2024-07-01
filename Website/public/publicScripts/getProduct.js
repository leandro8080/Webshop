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

	if (!token) {
		placeholder.remove();
		deleteProductButton.style.display = "none";
		updateProductButton.style.display = "none";
	}

	const fetchProduct = () => {
		fetch(`/products/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((product) => {
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
		if (token) {
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
				"Sie müssen sich authentifizieren, um Produkte zu löschen";
		}
	};

	fetchProduct();
	deleteProductButton.addEventListener("click", deleteProduct);
});
