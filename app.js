// js/app.js

// Saldo awal
let saldoRp = 162;
let saldoKoin = 10;

// Simpan transaksi ke localStorage
function simpanTransaksi(nama) {
  const transaksi = {
    nama,
    tanggal: new Date().toLocaleString()
  };
  localStorage.setItem('transaksiTerakhir', JSON.stringify(transaksi));
  alert(`Transaksi ${nama} berhasil!\n\nSaldo Anda sekarang Rp${saldoRp}`);
}

// Fungsi klik menu utama
function transaksi(namaProduk) {
  if (saldoRp >= 10) {
    saldoRp -= 10;
    saldoKoin -= 1;
    updateSaldo();
    simpanTransaksi(namaProduk);
  } else {
    alert("Saldo tidak cukup. Silakan isi saldo.");
  }
}

// Fungsi isi saldo manual
function isiSaldo() {
  const tambah = prompt("Masukkan jumlah saldo yang ingin ditambahkan:", "100");
  const jumlah = parseInt(tambah);
  if (!isNaN(jumlah)) {
    saldoRp += jumlah;
    saldoKoin += Math.floor(jumlah / 10);
    updateSaldo();
    alert(`Saldo berhasil ditambahkan: Rp${jumlah}`);
  } else {
    alert("Input tidak valid.");
  }
}

// Fungsi navigasi menu bawah
function navigate(menu) {
  alert(`Navigasi ke halaman: ${menu}`);
}

// Tampilkan saldo ke UI
function updateSaldo() {
  document.getElementById("saldoRp").textContent = "Rp" + saldoRp;
  document.getElementById("saldoKoin").textContent = saldoKoin;
}

// Efek klik bounce (opsional)
document.querySelectorAll('.action, .menu-item, .nav-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.add('clicked');
    setTimeout(() => item.classList.remove('clicked'), 200);
  });
});

// Saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
  updateSaldo();

  // Cek transaksi terakhir
  const last = localStorage.getItem('transaksiTerakhir');
  if (last) {
    const t = JSON.parse(last);
    console.log("Transaksi terakhir:", t.nama, t.tanggal);
  }
});
