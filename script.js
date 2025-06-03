document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('dark', toggle.checked);
    });
  }
});
