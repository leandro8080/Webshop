document.addEventListener("DOMContentLoaded", () => {
	const createButton = document.getElementById("createButton");
	const productCategoryInput = document.getElementById("productCategory");

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

	createButton.addEventListener("click", (event) => {
		event.preventDefault();
		const title = document.getElementById("productNameText").value;
		const price = document.getElementById("productPriceText").value;
		const category = document.getElementById("productCategory").value;
		console.log(title, price, category);

		fetch(`/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ title, price, category })
		})
			.then((response) => response.json())
			.then((product) => {
				console.log("Product created successfully:", product);
			})
			.catch((error) => {
				console.error("Error creating product:", error);
			});
	});

	fillSelect();
});
