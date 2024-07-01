// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const createButton = document.getElementById("createButton");
	const productCategoryInput = document.getElementById("productCategory");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
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

	createButton.addEventListener("click", () => {
		const name = document.getElementById("productNameText").value;
		const price = document.getElementById("productPriceText").value;
		const categoryId = document.getElementById("productCategory").value;
		const image = "image";
		const token = localStorage.getItem("token");
		if (token) {
			if (name && price && categoryId >= 1) {
				// Convert price to number https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
				// Look if the price has a value: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
				if (!isNaN(Number(price)))
					fetch(`/products`, {
						method: "POST",
						body: JSON.stringify({
							name,
							price,
							categoryId,
							image
						}), // Authentification with token: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json"
						}
					})
						.then((response) => response.json())
						.then((product) => {
							feedbackText.innerHTML = `Das Produkt "${product.name}" wurde erstellt`;
							document.getElementById("productNameText").value =
								"";
							document.getElementById("productPriceText").value =
								"";
							document.getElementById(
								"productCategory"
							).value = 1;
						});
				else {
					feedbackText.innerHTML = `Preis muss eine gültige Zahl sein`;
				}
			} else {
				feedbackText.innerHTML = `Bitte füllen Sie alle Felder aus`;
			}
		} else {
			feedbackText.innerHTML = `Sie müssen sich authentifizieren, um Produkte zu erstellen`;
		}
	});

	fillSelect();
});
