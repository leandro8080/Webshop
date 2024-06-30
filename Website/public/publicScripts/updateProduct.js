document.addEventListener("DOMContentLoaded", () => {
	const updateButton = document.getElementById("updateButton");
	const productCategoryInput = document.getElementById("productCategory");
	const productNameText = document.getElementById("productNameText");
	const productPriceText = document.getElementById("productPriceText");
	const backButton = document.getElementById("backButton");

	const fillSelect = () => {
		fetch("/categories")
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

	updateButton.addEventListener("click", (event) => {
		event.preventDefault();
		const name = productNameText.value;
		const price = productPriceText.value;
		const category = productCategoryInput.value;

		fetch(`/products/${window.location.pathname.split("/")[3]}`, {
			method: "PUT",
			body: JSON.stringify({ name, price, category })
		})
			.then((response) => response.json())
			.then((product) => {
				console.log("Product created successfully:", product);
			});
	});

	backButton.addEventListener("click", () => {
		window.location.href = `/products/show/${
			window.location.pathname.split("/")[3]
		}`;
	});

	fillSelect();
	fillProductData();
});
