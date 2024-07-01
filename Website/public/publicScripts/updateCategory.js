document.addEventListener("DOMContentLoaded", () => {
	const updateButton = document.getElementById("updateButton");
	const categoryNameText = document.getElementById("categoryNameText");
	const backButton = document.getElementById("backButton");

	const fillCategorytData = () => {
		fetch(`/categories/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((category) => {
				categoryNameText.value = category.name;
			});
	};

	updateButton.addEventListener("click", (event) => {
		event.preventDefault();
		const name = categoryNameText.value;

		fetch(`/categories/${window.location.pathname.split("/")[3]}`, {
			method: "PUT",
			body: JSON.stringify({ name })
		})
			.then((response) => response.json())
			.then((product) => {
				console.log("Product created successfully:", product);
			});
	});

	backButton.addEventListener("click", () => {
		window.location.href = `/categories/show/${
			window.location.pathname.split("/")[3]
		}`;
	});

	fillCategorytData();
});
