// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const categoryList = document.getElementById("categoryList");

	const fetchCategories = () => {
		fetch("/categories/get")
			.then((response) => response.json())
			.then((categories) => {
				categoryList.innerHTML = "";

				categories.forEach((category) => {
					categoryList.innerHTML += `<a class="container-sm border border-3 border-dark-subtle bg-light row py-3 text-dark text-decoration-none" href="categories/show/${category.id}">
									<div class="col">
										<h1 class="text-center">${category.name}</h1>
									</div>

								</a>`;
				});
			});
	};

	fetchCategories();
});
