document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded");

  if (typeof PRODUCTS === "undefined") {
    console.error("❌ PRODUCTS is not defined");
    return;
  }

  console.log("✅ PRODUCTS loaded:", PRODUCTS);

  const grid = document.getElementById("productGrid");
  const filters = document.getElementById("filters");
  const langSelect = document.getElementById("language");

  let currentLang = "en";
  let currentCategory = "All";

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

  function renderFilters() {
    filters.innerHTML = categories
      .map(cat => `<button data-cat="${cat}">${cat}</button>`)
      .join("");

    filters.querySelectorAll("button").forEach(btn => {
      btn.onclick = () => {
        currentCategory = btn.dataset.cat;
        renderProducts();
      };
    });
  }

  function renderProducts() {
    grid.innerHTML = "";

    const visible = PRODUCTS.filter(
      p => currentCategory === "All" || p.category === currentCategory
    );

    if (visible.length === 0) {
      grid.innerHTML = "<p>No products found</p>";
      return;
    }

    visible.forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <img src="${p.image}" alt="${p.name_en}">
          <h3>${currentLang === "en" ? p.name_en : p.name_ta}</h3>
          <p>${p.unit}</p>
          <strong>₹${p.price}</strong>
        </div>
      `;
    });
  }

  langSelect.addEventListener("change", e => {
    currentLang = e.target.value;
    renderProducts();
  });

  renderFilters();
  renderProducts();
});
