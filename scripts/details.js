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
      <div class="product-card">
        <img src="${
          product.imageUrl || "images/product-placeholder.png"
        }" alt="${product.name}">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p>${product.category?.description || "No description available"}</p>
          <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
          <p>In Stock: ${product.unitsInStock}</p>
          <p>Supplier: ${product.supplier?.companyName}</p>
          <p>Quantity Per Unit: ${product.quantityPerUnit}</p>
          <p>Units On Order: ${product.unitsOnOrder}</p>
          <p>Reorder Level: ${product.reorderLevel}</p>
          <p>Discontinued: ${product.discontinued ? "Yes" : "No"}</p>
        </div>
      </div>
    `;
    displayCustomerReviews(id);
    displayRelatedProducts(product.category.id);
  }

  async function displayCustomerReviews(productId) {
    const reviewsSection = document.getElementById("customerReviews");
    try {
      const response = await fetch(
        `http://localhost:4000/reviews?productId=${productId}`
      );
      const reviews = await response.json();
      reviewsSection.innerHTML = "<h3>Customer Reviews</h3>";
      if (reviews.length > 0) {
        reviews.forEach((review) => {
          const reviewDiv = document.createElement("div");
          reviewDiv.classList.add("review");
          reviewDiv.innerHTML = `
            <h4>${review.reviewer}</h4>
            <p>${review.comment}</p>
            <p>Rating: ${review.rating}</p>
          `;
          reviewsSection.appendChild(reviewDiv);
        });
      } else {
        reviewsSection.innerHTML += "<p>No reviews yet.</p>";
      }
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
    }
  }

  async function displayRelatedProducts(categoryId) {
    const relatedProductsSection = document.getElementById("relatedProducts");
    try {
      const response = await fetch(
        `http://localhost:4000/products?categoryId=${categoryId}`
      );
      const relatedProducts = await response.json();
      relatedProductsSection.innerHTML = "<h3>Related Products</h3>";
      const productsListDiv = document.createElement("div");
      productsListDiv.classList.add("products-list");
      relatedProducts.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
          <img src="${
            product.imageUrl || "images/product-placeholder.png"
          }" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>Price: $${product.unitPrice.toFixed(2)}</p>
          <a href="details.html?id=${product.id}">See Details</a>
        `;
        productsListDiv.appendChild(productDiv);
      });
      relatedProductsSection.appendChild(productsListDiv);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }
});
