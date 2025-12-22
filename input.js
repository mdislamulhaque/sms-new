// Password visibility toggle
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("passwordField");

if (togglePassword && passwordField) {
  togglePassword.addEventListener("click", function (e) {
    e.preventDefault();
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle icon
    const icon = this.querySelector("i");
    if (type === "password") {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
}

// Range slider value display
const rangeSlider = document.querySelector(".modern-range");
const rangeValue = document.getElementById("rangeValue");

if (rangeSlider && rangeValue) {
  rangeSlider.addEventListener("input", function () {
    rangeValue.textContent = `${this.value}%`;
  });
}

// File upload area interaction
const fileUploadArea = document.getElementById("fileUploadArea");
const fileInput = document.getElementById("fileInput");

if (fileUploadArea && fileInput) {
  fileUploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.style.borderColor = "var(--primary-color)";
    this.style.backgroundColor = "rgba(74, 108, 247, 0.05)";
  });

  fileUploadArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    this.style.borderColor = "var(--gray-light)";
    this.style.backgroundColor = "transparent";
  });

  fileUploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    this.style.borderColor = "var(--gray-light)";
    this.style.backgroundColor = "transparent";

    if (e.dataTransfer.files.length) {
      const fileName = e.dataTransfer.files[0].name;
      const uploadText = this.querySelector(".upload-text");
      uploadText.innerHTML = `<strong>${fileName}</strong> selected`;
    }
  });

  fileInput.addEventListener("change", function () {
    if (this.files.length) {
      const fileName = this.files[0].name;
      const uploadText = fileUploadArea.querySelector(".upload-text");
      uploadText.innerHTML = `<strong>${fileName}</strong> selected`;
    }
  });
}

// Character counter for textarea
const textarea = document.querySelector(".modern-textarea");
const charCount = document.querySelector(".char-count");

if (textarea && charCount) {
  textarea.addEventListener("input", function () {
    const currentLength = this.value.length;
    const maxLength = 500;
    charCount.textContent = `${currentLength}/${maxLength} characters`;

    if (currentLength > maxLength * 0.9) {
      charCount.style.color = "var(--danger-color)";
    } else if (currentLength > maxLength * 0.7) {
      charCount.style.color = "var(--warning-color)";
    } else {
      charCount.style.color = "var(--secondary-color)";
    }
  });
}

// Toggle switch status update
const toggleSwitches = document.querySelectorAll(".modern-toggle input");

toggleSwitches.forEach((toggle) => {
  const toggleStatus = toggle
    .closest(".toggle-item")
    .querySelector(".toggle-status");

  toggle.addEventListener("change", function () {
    toggleStatus.textContent = this.checked ? "On" : "Off";
  });
});

// Color picker value display
const colorPicker = document.querySelector(".modern-color");
const colorValue = document.querySelector(".color-value");

if (colorPicker && colorValue) {
  colorPicker.addEventListener("input", function () {
    colorValue.textContent = this.value;
  });
}

// Form submission
const exampleForm = document.getElementById("exampleForm");

if (exampleForm) {
  exampleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation
    const requiredFields = this.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "var(--danger-color)";

        // Remove error style on focus
        field.addEventListener(
          "focus",
          function () {
            this.style.borderColor = "var(--primary-color)";
          },
          { once: true }
        );
      }
    });

    if (isValid) {
      // Show success message
      alert("Form submitted successfully!");
      this.reset();

      // Reset toggle switches
      document.querySelectorAll(".toggle-status").forEach((status) => {
        status.textContent = "Off";
      });

      // Reset character counter
      if (charCount) {
        charCount.textContent = "0/500 characters";
        charCount.style.color = "var(--secondary-color)";
      }
    } else {
      alert("Please fill in all required fields.");
    }
  });
}

// Input focus effects
const inputs = document.querySelectorAll(
  ".modern-input, .modern-select, .modern-textarea"
);

inputs.forEach((input) => {
  // Add focus class to parent input-group
  input.addEventListener("focus", function () {
    const parentGroup = this.closest(".input-group");
    if (parentGroup) {
      parentGroup.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.15)";
    }
  });

  input.addEventListener("blur", function () {
    const parentGroup = this.closest(".input-group");
    if (parentGroup) {
      parentGroup.style.boxShadow = "none";
    }
  });
});

// Initialize character count on page load
if (textarea && charCount) {
  charCount.textContent = `${textarea.value.length}/500 characters`;
}
