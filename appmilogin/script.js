document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeOpen = togglePasswordBtn?.querySelector('.eye-open');
  const eyeClosed = togglePasswordBtn?.querySelector('.eye-closed');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = submitBtn?.querySelector('.button__text');
  const formAlert = document.getElementById('formAlert');

  // Переключение видимости пароля
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';

      if (eyeOpen && eyeClosed) {
        eyeOpen.style.display = isPassword ? 'none' : 'block';
        eyeClosed.style.display = isPassword ? 'block' : 'none';
      }

      togglePasswordBtn.setAttribute(
        'aria-label',
        isPassword ? 'Скрыть пароль' : 'Показать пароль'
      );
      togglePasswordBtn.setAttribute(
        'title',
        isPassword ? 'Скрыть пароль' : 'Показать пароль'
      );
    });
  }

  // Показ уведомления
  function showAlert(message, type = 'error') {
    if (!formAlert) return;
    formAlert.className = `form-alert form-alert--${type}`;
    formAlert.textContent = message;
    formAlert.style.display = 'flex';
  }

  function hideAlert() {
    if (!formAlert) return;
    formAlert.style.display = 'none';
    formAlert.textContent = '';
  }

  // Обработка отправки формы
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert();

      const loginVal = loginInput ? loginInput.value.trim() : '';
      const passwordVal = passwordInput ? passwordInput.value : '';

      if (!loginVal) {
        showAlert('Пожалуйста, укажите ваш логин или email');
        loginInput?.focus();
        return;
      }

      if (!passwordVal) {
        showAlert('Пожалуйста, введите пароль для входа');
        passwordInput?.focus();
        return;
      }

      if (passwordVal.length < 6) {
        showAlert('Пароль должен содержать не менее 6 символов');
        passwordInput?.focus();
        return;
      }

      // Имитация процесса авторизации
      if (submitBtn && submitText) {
        submitBtn.disabled = true;
        const originalText = submitText.textContent;
        submitText.textContent = 'Проверка данных...';
        submitBtn.style.opacity = '0.85';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = originalText;
          submitBtn.style.opacity = '';

          showAlert('Вход выполнен успешно! Перенаправление...', 'success');
        }, 900);
      }
    });
  }
});
