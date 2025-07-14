function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}

function loadPage(page) {
  const main = document.getElementById('mainContent');

  if (page === 'beranda') {
    main.innerHTML = `
      <h2>Beranda Produk</h2>
      <div class="produk-grid">
        <div class="produk-card">
          <img src="assets/item1.png" alt="Pulsa" />
          <h3>Pulsa 10K</h3>
          <p class="harga">Rp 11.000</p>
          <p class="rating">★ 4.5</p>
          <p class="diskon">Diskon 10%</p>
        </div>
        <div class="produk-card">
          <img src="assets/item2.png" alt="Data" />
          <h3>Data 1GB</h3>
          <p class="harga">Rp 12.000</p>
          <p class="rating">★ 4.7</p>
          <p class="diskon">Diskon 5%</p>
        </div>
      </div>
    `;
  } else {
    fetch(`pages/${page}.html`)
      .then(res => res.text())
      .then(html => {
        main.innerHTML = html;
      });
  }
}

window.onload = () => loadPage('beranda');
