// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const createButton = document.getElementById("createButton");

	createButton.addEventListener("click", (event) => {
		event.preventDefault();
		const name = document.getElementById("categoryNameText").value;
		console.log(name);

		fetch(`/categories`, {
			method: "POST",
			body: JSON.stringify({ name })
		})
			.then((response) => response.json())
			.then((product) => {
				console.log("Product created successfully:", product);
			});
	});
});
