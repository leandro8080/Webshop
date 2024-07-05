// Whole Script: Copied and modified from https://github.com/BitSparkCode/CRUD
document.addEventListener("DOMContentLoaded", () => {
	const nameText = document.getElementById("categoryName");
	const updateButton = document.getElementById("updateButton");
	const deleteButton = document.getElementById("deleteButton");
	const token = localStorage.getItem("token");
	const placeholder = document.getElementById("placeholder");
	const feedbackText = document.getElementById("feedbackText");
	feedbackText.innerHTML = "";
	const logoutButton = document.getElementById("logoutButton");
	const changePasswordButton = document.getElementById(
		"changePasswordButton"
	);

	const loginLogout = document.getElementById("loginLogout");

	logoutButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		location.reload();
	});

	changePasswordButton.addEventListener("click", () => {
		localStorage.removeItem("token");
		window.location.href = "/change-password";
	});

	if (!token) {
		loginLogout.innerHTML = `<a href="/login">Anmelden</a>`;
		placeholder.remove();
	}
	const fetchCategory = () => {
		fetch(`/categories/${window.location.pathname.split("/")[3]}`)
			.then((response) => response.json())
			.then((category) => {
				document.title = category.name;
				nameText.innerHTML = category.name;
				updateButton.addEventListener("click", () => {
					window.location.href = `/categories/edit/${category.id}`;
				});
			});
	};

	const deleteProduct = () => {
		if (isAdmin) {
			fetch("/products/get")
				.then((response) => response.json())
				.then((products) => {
					let productExistsWithCategory = false;
					products.forEach((product) => {
						console.log(product.categoryId);
						console.log(window.location.pathname.split("/")[3]);
						if (
							product.categoryId ==
							window.location.pathname.split("/")[3]
						) {
							console.log("test");
							feedbackText.innerHTML =
								"Es gibt noch Produkte mit dieser Kategorie";
							productExistsWithCategory = true;
							return;
						}
					});
					if (productExistsWithCategory) {
						return;
					}
					fetch(
						`/categories/${window.location.pathname.split("/")[3]}`,
						{
							method: "DELETE",
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					).then(() => {
						localStorage.setItem(
							"categoriesFeedback",
							"Die Kategorie wurde gelöscht"
						);
						window.location.href = "/categories";
					});
				});
		} else {
			feedbackText.innerHTML =
				"Sie müssen ein Admin sein, um Kategorien zu löschen";
		}
	};

	let isAdmin;
	async function authorizeAdmin() {
		try {
			const response = await fetch("/api/isAdmin", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				if (data === "admin") {
					isAdmin = true;
				} else {
					isAdmin = false;
				}
			}
		} catch {
			isAdmin = false;
		} finally {
			if (!isAdmin) {
				updateButton.style.display = "none";
				deleteButton.style.display = "none";
				placeholder.remove();
			}
		}
	}

	fetchCategory();
	deleteButton.addEventListener("click", deleteProduct);
	authorizeAdmin();
});
