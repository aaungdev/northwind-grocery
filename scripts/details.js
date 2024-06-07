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
      const product = await response.json();
      console.log("Product details fetched:", product); // Debugging
      if (product && product.name && product.unitPrice) {
        displayProductDetails(product);
      } else {
        console.error("Product data is missing expected fields:", product);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function displayProductDetails(product) {
    const description =
      product.category?.description ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const supplierName = product.supplier?.companyName || "Unknown supplier";

    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
          <img src="${product.imageUrl || "images/placeholder.jpg"}" alt="${
      product.name
    }">
          <h2>${product.name}</h2>
          <p>${description}</p>
          <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
          <p>In Stock: ${product.unitsInStock}</p>
          <p>Supplier: ${supplierName}</p>
          <p>Quantity per Unit: ${product.quantityPerUnit}</p>
          <p>Units on Order: ${product.unitsOnOrder}</p>
          <p>Reorder Level: ${product.reorderLevel}</p>
          <p>Discontinued: ${product.discontinued ? "Yes" : "No"}</p>
      `;
  }
});
