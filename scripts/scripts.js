"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  await fetchAllProducts();

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

  function displayProducts(products) {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const description =
        product.category.description ||
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
