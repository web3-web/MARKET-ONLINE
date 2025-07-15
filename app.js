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

// ===================
// Form Pembelian & PDF
// ===================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formTransaksi");
  const notif = document.getElementById("notif");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("namaPembeli").value;
      const produk = document.getElementById("produkDipilih").value;

      if (!nama || !produk) return;

      const data = {
        nama,
        produk,
        status: "Belum",
        waktu: new Date().toLocaleString()
      };

      let riwayat = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
      riwayat.push(data);
      localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayat));

      notif.innerText = "✅ Transaksi berhasil disimpan!";
      form.reset();

      generatePDF(data);
    });
  }
});

// Fungsi cetak PDF pakai jsPDF
function generatePDF(data) {
  const doc = new jsPDF();
  doc.text("Struk Pembelian Xpay", 20, 20);
  doc.text(`Nama: ${data.nama}`, 20, 30);
  doc.text(`Produk: ${data.produk}`, 20, 40);
  doc.text(`Status: ${data.status}`, 20, 50);
  doc.text(`Waktu: ${data.waktu}`, 20, 60);
  doc.save(`Struk-${data.nama}.pdf`)
 }
