document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  if (!window.PRODUCTS) {
    console.error("❌ PRODUCTS not found");
    return;
  }

  console.log("✅ PRODUCTS found:", PRODUCTS);

  const grid = document.getElementById("productGrid");
  const filters = document.getElementById("filters");
  const langSelect = document.getElementById("language");

  let currentLang = "en";
  let currentCategory = "All";

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

  function renderFilters() {
    filters.innerHTML = categories
      .map(cat => `<button>${cat}</button>`)
      .join("");

    [...filters.children].forEach((btn, i) => {
      btn.onclick = () => {
        currentCategory = categories[i];
        renderProducts();
      };
    });
  }

  function renderProducts() {
    grid.innerHTML = "";

    const list = PRODUCTS.filter(
      p => currentCategory === "All" || p.category === currentCategory
    );

    list.forEach(p => {
      const name = currentLang === "en" ? p.name_en : p.name_ta;
      const priceText = p.price ? `₹${p.price}` : "Contact for price";

      const message = encodeURIComponent(
        `Hello, I want to order\n\n` +
        `Product: ${name}\n` +
        `Price: ${priceText}\n` +
        `SKU: ${p.sku}`
      );

      const whatsappLink = `https://wa.me/917639840695?text=${message}`;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${p.image}" alt="${name}">
        <h3>${name}</h3>
        <p>${p.unit}</p>
        <strong>${priceText}</strong>

        <a href="${whatsappLink}" target="_blank" class="wa-btn">
          Order on WhatsApp
        </a>
      `;

      grid.appendChild(card);
    });
  }

  langSelect.onchange = e => {
    currentLang = e.target.value;
    renderProducts();
  };

  renderFilters();
  renderProducts();
});
