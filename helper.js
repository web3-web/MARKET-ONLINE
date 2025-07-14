// helper.js

import { config } from './config.js';

export function showAlert(msg) {
  alert(msg);
}

export function handleTopupClick() {
  const isiSaldoBtn = document.querySelector('.action img[src="assets/topup.png"]');
  if (isiSaldoBtn) {
    isiSaldoBtn.parentElement.addEventListener('click', function () {
      showAlert('Silakan hubungi admin di ' + config.adminContact);
    });
  }
}
