"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    console.error("No product ID specified in URL");
    window.location.href = "index.html";
  } else {
    await fetchProductDetails(productId);
  }

  async function fetchProductDetails(id) {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`);
      const data = await response.json();
      console.log("Product details fetched:", data); // Debugging
      if (data && data.name && data.unitPrice) {
        displayProductDetails(data);
      } else {
        console.error("Product data is missing expected fields:", data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function displayProductDetails(product) {
    const description =
      product.category.description ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
          <img src="${product.imageUrl || "images/placeholder.jpg"}" alt="${
      product.name
    }">
          <h2>${product.name}</h2>
          <p>${description}</p>
          <p class="price">Price: $${product.unitPrice}</p>
          <p>In Stock: ${product.unitsInStock}</p>
          <p>Supplier: ${
            product.supplier?.companyName || "Unknown supplier"
          }</p>
      `;
  }
});
