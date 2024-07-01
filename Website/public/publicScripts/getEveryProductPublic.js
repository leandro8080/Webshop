document.addEventListener("DOMContentLoaded", () => {
	const productList = document.getElementById("productList");

	const fetchProducts = () => {
		fetch("/products/get")
			.then((response) => response.json())
			.then((products) => {
				productList.innerHTML = "";

				products.forEach((product) => {
					fetch(`/categories/${product.categoryId}`)
						.then((response) => response.json())
						.then((category) => {
							productList.innerHTML += `
								<a class="container-sm border border-3 border-dark-subtle bg-light row py-3 text-dark text-decoration-none" href="/show/products/${product.id}">
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
