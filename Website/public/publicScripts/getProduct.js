document.addEventListener("DOMContentLoaded", () => {
	const productNameText = document.getElementById("productName");
	const productPriceText = document.getElementById("productPrice");
	const productCategoryText = document.getElementById("productCategory");

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
					});
			});
	};

	fetchProduct();
});