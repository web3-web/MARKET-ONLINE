// app.js

import { config } from './config.js';
import { showAlert, handleTopupClick } from './helper.js';

document.addEventListener('DOMContentLoaded', function () {
  handleTopupClick();

  const moreBtn = document.querySelector('.nav-item.center');
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      showAlert('Fitur lainnya akan segera hadir.');
    });
  }
});
