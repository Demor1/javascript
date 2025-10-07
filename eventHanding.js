const form = document.forms.main;
const inputs = form.querySelectorAll("input");

const nameCheck = /^[А-Яа-яA-Za-zІіЇїЄєҐґ\s]{2,}$/;
const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUppercase = /[A-Z]/;
const hasDigit = /\d/;

function validateField(input) {
  const value = input.value.trim();
  const fieldName = input.name;
  let error = "";

  switch (fieldName) {
    case "name":
      if (!value) {
        error = "Name is required";
      } else if (value.length < 2) {
        error = "Name must have min 2 symbols";
      } else if (!nameCheck.test(value)) {
        error = "Name can has only words";
      }
      break;

    case "email":
      if (!value) {
        error = "Email is required";
      } else if (!emailCheck.test(value)) {
        error = "Not valid email";
      }
      break;

    case "password":
      if (!value) {
        error = "Password is required";
      } else if (!hasUppercase.test(value)) {
        error = "Password must have at lest 1 big letter";
      } else if (!hasDigit.test(value)) {
        error = "Password must have at least 1 number ";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;
  }

  return error;
}

function showError(input, message) {
  const formGroup = input.closest(".form__group");
  const errorElement = formGroup.querySelector(".error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function clearError(input) {
  const formGroup = input.closest(".form__group");
  const errorElement = formGroup.querySelector(".error");
  errorElement.textContent = "";
  errorElement.classList.remove("show");
  input.classList.remove("invalid");

  if (input.value.trim()) {
    input.classList.add("valid");
  }
}

function showHint(input) {
  const formGroup = input.closest(".form__group");
  const hintElement = formGroup.querySelector(".hint");
  hintElement.classList.add("show");
}

function hideHint(input) {
  const formGroup = input.closest(".form__group");
  const hintElement = formGroup.querySelector(".hint");
  hintElement.classList.remove("show");
}

inputs.forEach((input) => {
  input.addEventListener("focus", (event) => {
    showHint(event.target);
  });

  input.addEventListener("blur", (event) => {
    hideHint(event.target);

    const error = validateField(event.target);

    if (error) {
      showError(event.target, error);
    } else {
      clearError(event.target);
    }
  });

  input.addEventListener("input", (event) => {
    if (
      event.target.classList.contains("invalid") ||
      event.target.classList.contains("valid")
    ) {
      const error = validateField(event.target);

      if (error) {
        showError(event.target, error);
      } else {
        clearError(event.target);
      }
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  const formData = {};

  inputs.forEach((input) => {
    const error = validateField(input);

    if (error) {
      showError(input, error);
      isValid = false;
    } else {
      clearError(input);
      formData[input.name] = input.value.trim();
    }
  });

  if (isValid) {
    console.log("Sending data:", formData);
    form.reset();
    inputs.forEach((input) => {
      input.classList.remove("valid", "invalid");
    });
  }
});
