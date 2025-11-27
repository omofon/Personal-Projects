document.addEventListener("DOMContentLoaded", () => {
  // 1. Selectors for main elements
  const form = document.getElementById("contact-form"); // Use ID selector

  // Selectors for input fields and their error spans
  const firstNameInput = document.getElementById("first-name");
  const firstNameError = document.getElementById("first-name-error");

  const lastNameInput = document.getElementById("last-name");
  const lastNameError = document.getElementById("last-name-error");

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error"); // Updated selector ID

  // NEW: Password fields
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phone-error"); // Updated selector ID

  const toggleButtons = document.querySelectorAll(".toggle-password");

  // Regex and Constraints
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{7,20}$/;
  const MIN_PASSWORD_LENGTH = 8;

  // --- Helper Functions (Same as before) ---

  function setError(inputEl, errorEl, message) {
    inputEl.classList.add("invalid");
    errorEl.textContent = message;
  }

  function clearError(inputEl, errorEl) {
    inputEl.classList.remove("invalid");
    errorEl.textContent = "";
  }

  function validateRequiredText(inputEl, errorEl, fieldName) {
    const value = inputEl.value.trim();
    if (value === "") {
      setError(inputEl, errorEl, `${fieldName} is required`);
      return false;
    }
    clearError(inputEl, errorEl);
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === "") {
      setError(emailInput, emailError, "Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError(emailInput, emailError, "Invalid email format");
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  // --- NEW VALIDATION FUNCTIONS ---

  function validatePassword() {
    const password = passwordInput.value;
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        passwordInput,
        passwordError,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      );
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Check if the main password is valid first (optional, but good practice)
    if (!validatePassword()) {
      // If main password fails, we don't proceed with matching check
      setError(
        confirmPasswordInput,
        confirmPasswordError,
        "Fix password field first"
      );
      return false;
    }

    if (confirmPassword === "") {
      setError(
        confirmPasswordInput,
        confirmPasswordError,
        "Confirm password is required"
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError(
        confirmPasswordInput,
        confirmPasswordError,
        "Passwords do not match"
      );
      return false;
    }

    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  }

  // --- (Existing validatePhone function is fine) ---
  function validatePhone() {
    const phone = phoneInput.value.trim();
    if (phone !== "" && !phoneRegex.test(phone)) {
      setError(phoneInput, phoneError, "Invalid phone number");
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  // --- NEW TOGGLE FUNCTION ---

  function togglePasswordVisibility(e) {
    const button = e.currentTarget;
    const targetId = button.dataset.target;
    const targetInput = document.getElementById(targetId);

    if (targetInput.type === "password") {
      targetInput.type = "text";
      button.classList.add("visible");
    } else {
      targetInput.type = "password";
      button.classList.remove("visible");
    }
  }

  // --- Main Submission Handler ---

  function handleFormSubmit(e) {
    e.preventDefault();

    // Run all validation checks. Order matters for user experience.
    const isFirstNameValid = validateRequiredText(
      firstNameInput,
      firstNameError,
      "First Name"
    );
    const isLastNameValid = validateRequiredText(
      lastNameInput,
      lastNameError,
      "Last Name"
    );
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    // Run confirm password check AFTER the main password check
    const isConfirmPasswordValid = validateConfirmPassword();
    const isPhoneValid = validatePhone();

    // Check if ALL validations passed
    const isFormValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isPhoneValid;

    if (isFormValid) {
      console.log("Form is valid! Submitting data...");
      alert("Contact form submitted successfully!");
      form.reset();
      // Clear all error styles and messages after reset
      clearError(firstNameInput, firstNameError);
      clearError(lastNameInput, lastNameError);
      clearError(emailInput, emailError);
      clearError(passwordInput, passwordError);
      clearError(confirmPasswordInput, confirmPasswordError);
      clearError(phoneInput, phoneError);
    } else {
      console.log("Form validation failed.");
      // Find the first invalid element and focus on it
      const firstInvalid = document.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  }

  // --- Event Listeners ---

  form.addEventListener("submit", handleFormSubmit);

  // Real-time validation listeners
  firstNameInput.addEventListener("blur", () =>
    validateRequiredText(firstNameInput, firstNameError, "First Name")
  );
  lastNameInput.addEventListener("blur", () =>
    validateRequiredText(lastNameInput, lastNameError, "Last Name")
  );
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);

  // NEW: Password listeners
  passwordInput.addEventListener("input", validatePassword);
  // Confirm password should check the match whenever it or the main password changes
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);
  passwordInput.addEventListener("input", validateConfirmPassword);

  // NEW: Toggle password visibility listener
  toggleButtons.forEach((button) => {
    button.addEventListener("click", togglePasswordVisibility);
  });

  // Reset button listener
  document.querySelector(".close-btn").addEventListener("click", () => {
    setTimeout(() => {
      clearError(firstNameInput, firstNameError);
      clearError(lastNameInput, lastNameError);
      clearError(emailInput, emailError);
      clearError(passwordInput, passwordError);
      clearError(confirmPasswordInput, confirmPasswordError);
      clearError(phoneInput, phoneError);
    }, 50);
  });
});
