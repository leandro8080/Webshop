// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const nameText = document.getElementById("categoryName");
	const updateButton = document.getElementById("updateButton");
	const deleteButton = document.getElementById("deleteButton");

	const fetchProduct = () => {
		fetch(`/categories/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((category) => {
				nameText.innerHTML = category.name;
				updateButton.addEventListener("click", () => {
					window.location.href = `/categories/edit/${category.id}`;
				});
			});
	};

	const deleteProduct = () => {
		fetch(`/categories/${window.location.pathname.split("/")[3]}`, {
			method: "DELETE"
		}).then(() => {
			window.location.href = "/categories";
		});
	};

	fetchProduct();
	deleteButton.addEventListener("click", deleteProduct);
});
