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
      console.log("Product details fetched:", product); // Debugging
      if (product) {
        displayProductDetails(product);
      } else {
        console.error("Product not found:", product);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function displayProductDetails(product) {
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
          <h2>${product.name}</h2>
          <img src="images/product-placeholder.png" alt="${product.name}">
          <p>${product.category.description || "No description available"}</p>
          <p><strong>Price:</strong> $${product.unitPrice.toFixed(2)}</p>
          <p><strong>In Stock:</strong> ${product.unitsInStock}</p>
          <p><strong>Supplier:</strong> ${product.supplier.companyName}</p>
          <p><strong>Quantity per Unit:</strong> ${product.quantityPerUnit}</p>
          <p><strong>Units on Order:</strong> ${product.unitsOnOrder}</p>
          <p><strong>Reorder Level:</strong> ${product.reorderLevel}</p>
          <p><strong>Discontinued:</strong> ${
            product.discontinued ? "Yes" : "No"
          }</p>
          <a href="products.html">Back to Products</a>
      `;
  }
});
