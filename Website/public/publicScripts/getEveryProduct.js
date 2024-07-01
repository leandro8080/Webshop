// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const productsList = document.getElementById("productsList");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = localStorage.getItem("productsFeedback");
	localStorage.removeItem("productsFeedback");

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
