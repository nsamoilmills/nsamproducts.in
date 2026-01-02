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
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name_en}">
        <h3>${currentLang === "en" ? p.name_en : p.name_ta}</h3>
        <p>${p.unit}</p>
        <strong>₹${p.price}</strong>
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
