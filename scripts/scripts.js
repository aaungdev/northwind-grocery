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
      if (Array.isArray(data)) {
        populateCategories(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchProductsByCategory(categoryId) {
    try {
      const response = await fetch(
        `http://localhost:4000/products?category=${categoryId}`
      );
      const data = await response.json();
      console.log("Products by category fetched:", data); // Debugging
      if (Array.isArray(data)) {
        displayProducts(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  }

  function displayProducts(products) {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
                <img src="images/product-placeholder.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${
                  product.category.description || "No description available"
                }</p>
                <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
                <p>In Stock: ${product.unitsInStock}</p>
                <p>Supplier: ${product.supplier.companyName}</p>
                <a href="details.html?id=${product.id}">See Details</a>
            `;
      productsList.appendChild(productElement);
    });
  }

  function populateCategories(categories) {
    const categoriesSelect = document.getElementById("categories");
    categoriesSelect.innerHTML = '<option value="">Select a category</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categoriesSelect.appendChild(option);
    });
  }

  // Initial Fetch
  await fetchCategories();
});
