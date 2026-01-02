const grid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
const langSelect = document.getElementById("language");

let currentLang = "en";
let currentCategory = "All";

const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

function renderFilters() {
  filters.innerHTML = categories
    .map(cat => `<button onclick="setCategory('${cat}')">${cat}</button>`)
    .join("");
}

function setCategory(cat) {
  currentCategory = cat;
  renderProducts();
}

function renderProducts() {
  grid.innerHTML = "";

  PRODUCTS
    .filter(p => currentCategory === "All" || p.category === currentCategory)
    .forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <img src="${p.image}" alt="${p.name_en}">
          <h3>${currentLang === "en" ? p.name_en : p.name_ta}</h3>
          <p>${p.unit}</p>
          <strong>₹${p.price}</strong>
          <a href="https://wa.me/919944291896?text=I want to order ${p.name_en}">
            Order on WhatsApp
          </a>
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

