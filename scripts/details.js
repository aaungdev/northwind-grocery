"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (productId) {
    await fetchProductDetails(productId);
  }

  async function fetchProductDetails(id) {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`);
      const product = await response.json();
      displayProductDetails(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function displayProductDetails(product) {
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
          <img src="images/product-placeholder.png" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.category.description || "No description available"}</p>
          <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
          <p>In Stock: ${product.unitsInStock}</p>
          <p>Supplier: ${product.supplier.companyName}</p>
          <p>Quantity Per Unit: ${product.quantityPerUnit}</p>
          <p>Units On Order: ${product.unitsOnOrder}</p>
          <p>Reorder Level: ${product.reorderLevel}</p>
          <p>Discontinued: ${product.discontinued ? "Yes" : "No"}</p>
      `;
  }
});
