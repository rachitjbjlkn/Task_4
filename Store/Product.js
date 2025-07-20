const API_URL = 'https://fakestoreapi.com/products';

const productList = document.getElementById('productList');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let products = [];

function showLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

async function fetchProducts() {
  showLoader(true);
  const res = await fetch(API_URL);
  products = await res.json();
  renderProducts(products);
  showLoader(false);
  fetchCategories();
}

async function fetchCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await res.json();
  categoryFilter.innerHTML = `<option value="">All Categories</option>` +
  categories.map(cat => `<option value="${cat}">${cat[0].toUpperCase() + cat.slice(1)}</option>`).join('');
}

function renderProducts(list) {
  productList.innerHTML = '';
  if (!list.length) {
    productList.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No products found.</p>';
    return;
  }
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price}</div>
      <div class="product-description">${product.description.slice(0, 100)}...</div>
      <button class="product-btn">View Details</button>
    `;
    card.querySelector('.product-btn').addEventListener('click', () => showProductPopup(product));
    productList.appendChild(card);
  });
}

function applyFiltersAndSort() {
  let filtered = products.filter(p =>
    (!categoryFilter.value || p.category === categoryFilter.value) &&
    (p.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
     p.description.toLowerCase().includes(searchInput.value.toLowerCase()))
  );
  switch (sortSelect.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price); break;
    case 'title-asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
    case 'title-desc':
      filtered.sort((a, b) => b.title.localeCompare(a.title)); break;
  }
  renderProducts(filtered);
}

function showProductPopup(product) {
  let popup = document.getElementById('productPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'productPopup';
    popup.innerHTML = `
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <button class="popup-close">&times;</button>
        <img class="popup-img" />
        <h2 class="popup-title"></h2>
        <div class="popup-price"></div>
        <div class="popup-category"></div>
        <div class="popup-desc"></div>
        <button class="popup-buy-btn">Buy Now</button>
      </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector('.popup-close').onclick = closeProductPopup;
    popup.querySelector('.popup-overlay').onclick = closeProductPopup;
  }
  popup.querySelector('.popup-img').src = product.image;
  popup.querySelector('.popup-img').alt = product.title;
  popup.querySelector('.popup-title').textContent = product.title;
  popup.querySelector('.popup-price').textContent = `Price: $${product.price}`;
  popup.querySelector('.popup-category').textContent = `Category: ${product.category}`;
  popup.querySelector('.popup-desc').textContent = product.description;
  popup.querySelector('.popup-buy-btn').onclick = () => window.open(product.image, '_blank');
  popup.style.display = 'flex';
  setTimeout(() => popup.classList.add('show'), 10);
}

function closeProductPopup() {
  const popup = document.getElementById('productPopup');
  if (popup) {
    popup.classList.remove('show');
    setTimeout(() => { popup.style.display = 'none'; }, 200);
  }
}

searchInput.addEventListener('input', applyFiltersAndSort);
categoryFilter.addEventListener('change', applyFiltersAndSort);
sortSelect.addEventListener('change', applyFiltersAndSort);

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

fetchProducts();