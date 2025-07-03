const produkDefault = [
  {
    id: 1,
    nama: "Pulsa 10.000",
    harga: 12000,
    gambar: "https://via.placeholder.com/200",
    diskon: 10,
    rating: 4.5,
    terjual: 120
  }
];

if (!localStorage.getItem("produk")) {
  localStorage.setItem("produk", JSON.stringify(produkDefault));
}

let userRole = "";

function tampilkanProduk() {
  const produkList = JSON.parse(localStorage.getItem("produk"));
  const container = document.getElementById("produkContainer");
  container.innerHTML = "";

  produkList.forEach(p => {
    const elemen = document.createElement("div");
    elemen.className = "produk";
    elemen.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}" />
      ${p.diskon ? `<div class='diskon-label'>${p.diskon}% OFF</div>` : ""}
      <h3>${p.nama}</h3>
      <p>Harga: Rp ${p.harga.toLocaleString()}</p>
      <p class="rating-stars">${"★".repeat(Math.round(p.rating))}</p>
      <button onclick="beliProduk(${p.id})">Beli</button>
      <button class="hapus-produk ${userRole ? 'admin-visible' : ''}" onclick="hapusProduk(${p.id})">Hapus</button>
    `;
    container.appendChild(elemen);
  });

  document.getElementById("formTambah").classList.toggle("hidden", !userRole);
}

tampilkanProduk();

function beliProduk(id) {
  const produkList = JSON.parse(localStorage.getItem("produk"));
  const p = produkList.find(item => item.id === id);
  window._produkTerpilih = p;
  document.getElementById("popupStruk").style.display = "block";
}

function tutupPopup() {
  document.getElementById("popupStruk").style.display = "none";
}

function lanjutWA() {
  const nama = document.getElementById("namaPembeli").value;
  const alamat = document.getElementById("alamatPembeli").value;
  const p = window._produkTerpilih;
  const isi = `Halo, saya ingin beli ${p.nama} seharga Rp${p.harga.toLocaleString()}\nNama: ${nama}\nAlamat: ${alamat}`;

  const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
  riwayat.push(`${p.nama} - ${nama}`);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
  tampilRiwayat();

  window.open(`https://wa.me/?text=${encodeURIComponent(isi)}`);
  tutupPopup();
}

function tampilRiwayat() {
  const list = JSON.parse(localStorage.getItem("riwayat")) || [];
  const ul = document.getElementById("riwayatList");
  ul.innerHTML = list.map(item => `<li>${item}</li>`).join("");
}
tampilRiwayat();

function urutkanProduk() {
  const val = document.getElementById("sortFilter").value;
  let produkList = JSON.parse(localStorage.getItem("produk"));

  switch(val) {
    case "termurah":
      produkList.sort((a,b) => a.harga - b.harga); break;
    case "termahal":
      produkList.sort((a,b) => b.harga - a.harga); break;
    case "terlaris":
      produkList.sort((a,b) => b.terjual - a.terjual); break;
    default:
      produkList.sort((a,b) => a.id - b.id);
  }

  localStorage.setItem("produk", JSON.stringify(produkList));
  tampilkanProduk();
}

function hapusProduk(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  let produkList = JSON.parse(localStorage.getItem("produk"));
  produkList = produkList.filter(p => p.id !== id);
  localStorage.setItem("produk", JSON.stringify(produkList));
  tampilkanProduk();
}

function loginOwner() {
  const user = document.getElementById("ownerUser").value;
  const pass = document.getElementById("ownerPass").value;
  if (user === "OWNERKU" && pass === "OWNER MASUK 1") {
    userRole = "owner";
    alert("Login Owner berhasil!");
    tampilkanProduk();
  } else {
    alert("Login Owner gagal");
  }
}

function loginPemilik() {
  const user = document.getElementById("pemilikUser").value;
  const pass = document.getElementById("pemilikPass").value;
  if (user === "FAHDiL" && pass === "WEB ADMIN GANTENG.1") {
    userRole = "pemilik";
    alert("Login Pemilik berhasil!");
    tampilkanProduk();
  } else {
    alert("Login Pemilik gagal");
  }
}

function tambahProduk() {
  const nama = document.getElementById("namaProduk").value;
  const harga = parseInt(document.getElementById("hargaProduk").value);
  const diskon = parseInt(document.getElementById("diskonProduk").value) || 0;
  const rating = parseFloat(document.getElementById("ratingProduk").value) || 5;

  const file = document.getElementById("gambarUpload").files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const gambar = e.target.result;
    const produkList = JSON.parse(localStorage.getItem("produk"));
    const idBaru = produkList.length ? produkList[produkList.length - 1].id + 1 : 1;
    produkList.push({ id: idBaru, nama, harga, gambar, diskon, rating, terjual: 0 });
    localStorage.setItem("produk", JSON.stringify(produkList));
    tampilkanProduk();

    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";
    document.getElementById("gambarUpload").value = "";
    document.getElementById("diskonProduk").value = "";
    document.getElementById("ratingProduk").value = "";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert("Silakan pilih gambar produk!");
  }
}

function hitungStatistik() {
  const produkList = JSON.parse(localStorage.getItem("produk"));
  const transaksiList = JSON.parse(localStorage.getItem("riwayat")) || [];
  document.getElementById("totalProduk").textContent = produkList.length;
  document.getElementById("jumlahTransaksi").textContent = transaksiList.length;

  const terlaris = produkList.reduce((max, p) => p.terjual > max.terjual ? p : max, produkList[0]);
  document.getElementById("produkTerlaris").textContent = terlaris ? terlaris.nama : "-";
    }
