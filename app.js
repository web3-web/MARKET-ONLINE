// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

// Load Halaman (nanti bisa dihubungkan ke folder pages)
function loadPage(page) {
  const mainContent = document.getElementById("mainContent");

  switch (page) {
    case "beranda":
      mainContent.innerHTML = `
        <h2 class="section-title">Beranda</h2>
        <div class="product-grid">
          <div class="product-card">
            <img src="assets/pulsa.png" alt="Pulsa 10K">
            <h3>Pulsa 10K</h3>
            <p class="price">Rp 11.000</p>
            <div class="tags"><span class="rating">★ 4.7</span><span class="diskon">10% OFF</span></div>
            <button class="btn-beli">Beli</button>
          </div>

          <div class="product-card">
            <img src="assets/data.png" alt="Data 1GB">
            <h3>Data 1GB</h3>
            <p class="price">Rp 12.000</p>
            <div class="tags"><span class="rating">★ 4.5</span><span class="diskon">5% OFF</span></div>
            <button class="btn-beli">Beli</button>
          </div>

          <div class="product-card">
            <img src="assets/game.png" alt="Diamond ML">
            <h3>Diamond ML</h3>
            <p class="price">Rp 16.500</p>
            <div class="tags"><span class="rating">★ 4.9</span><span class="diskon">15% OFF</span></div>
            <button class="btn-beli">Beli</button>
          </div>
        </div>
      `;
      break;

    case "transaksi":
      mainContent.innerHTML = `
        <h2 class="section-title">Transaksi Saya</h2>
        <p>Belum ada transaksi.</p>
      `;
      break;

    case "topup":
      mainContent.innerHTML = `
        <h2 class="section-title">Top Up Saldo</h2>
        <p>Fitur ini akan segera tersedia.</p>
      `;
      break;

    case "akun":
      mainContent.innerHTML = `
        <h2 class="section-title">Akun Saya</h2>
        <p>Nama: FAHDiL</p>
        <p>Email: xpay@email.com</p>
      `;
      break;

    default:
      mainContent.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
  }
}
