"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  const searchBy = document.getElementById("searchBy");
  const categoryLabel = document.getElementById("categoryLabel");
  const categoriesSelect = document.getElementById("categories");

  searchBy.addEventListener("change", async function () {
    if (searchBy.value === "category") {
      categoryLabel.style.display = "inline";
      categoriesSelect.style.display = "inline";
      await fetchCategories();
    } else if (searchBy.value === "viewAll") {
      categoryLabel.style.display = "none";
      categoriesSelect.style.display = "none";
      await fetchAllProducts();
    } else {
      categoryLabel.style.display = "none";
      categoriesSelect.style.display = "none";
      document.getElementById("productsList").innerHTML = ""; // Clear products list
    }
  });

  categoriesSelect.addEventListener("change", async function () {
    if (categoriesSelect.value) {
      await fetchProductsByCategory(categoriesSelect.value);
    } else {
      document.getElementById("productsList").innerHTML = ""; // Clear products list
    }
  });

  async function fetchAllProducts() {
    try {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
      console.log("Products fetched:", data); // Debugging
      if (Array.isArray(data)) {
        displayProducts(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      console.log("Categories fetched:", data); // Debugging
      categoriesSelect.innerHTML =
        '<option value="">Select a category</option>';
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoriesSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchProductsByCategory(categoryId) {
    try {
      const response = await fetch(
        `http://localhost:4000/products?categoryId=${categoryId}`
      );
      const data = await response.json();
      console.log("Products fetched by category:", data); // Debugging
      displayProducts(data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  }

  function displayProducts(products) {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const description =
        product.category?.description ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      const supplierName = product.supplier?.companyName || "Unknown supplier";

      productDiv.innerHTML = `
                <img src="${
                  product.imageUrl || "images/placeholder.jpg"
                }" alt="${product.name}">
                <h3>${product.name || "No name available"}</h3>
                <p>${description}</p>
                <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
                <p>In Stock: ${product.unitsInStock}</p>
                <p>Supplier: ${supplierName}</p>
                <a href="details.html?id=${product.id}">See Details</a>
            `;
      productsList.appendChild(productDiv);
    });
  }
});
