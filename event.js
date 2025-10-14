class FormsValidation {
  selectors = {
    form: "[data-js-form]",
    fieldErrors: "[data-js-form-field-errors]",
    fieldHint: ".field__hint",
  };

  errorMessages = {
    valueMissing: () => "This field is required.",
    patternMismatch: ({ title }) =>
      title || "Please match the requested format.",
    tooShort: ({ minLength }) => `The input is too short - ${minLength}`,
    tooLong: ({ maxLength }) =>
      `The input is too long, limit of symbols -${maxLength}`,
    typeMismatch: () => "Please, enter valid email.",
  };

  constructor() {
    this.form = document.querySelector(this.selectors.form);
    this.bindEvents();
  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldContainer = fieldControlElement.closest(".field");
    if (!fieldContainer) return;
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(
      this.selectors.fieldErrors
    );

    if (fieldErrorsElement) {
      fieldErrorsElement.innerHTML = errorMessages
        .map((message) => `<span class="field__error">${message}</span>`)
        .join("");

      if (errorMessages.length > 0) {
        fieldControlElement.classList.add("is-invalid");
        fieldControlElement.classList.remove("is-valid");
      } else {
        fieldControlElement.classList.remove("is-invalid");
        if (fieldControlElement.value.trim() !== "") {
          fieldControlElement.classList.add("is-valid");
        }
      }
    }
  }

  manageHint(fieldControlElement, show = false) {
    const fieldContainer = fieldControlElement.closest(".field");
    if (!fieldContainer) return;
    const hintElement = fieldContainer.querySelector(this.selectors.fieldHint);
    if (hintElement) {
      hintElement.classList.toggle("is-visible", show);
    }
  }

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity;
    const errorMessages = [];

    if (errors.valid) {
      this.manageErrors(fieldControlElement, []);
      return true;
    }

    Object.entries(this.errorMessages).forEach(
      ([errorType, getErrorMessage]) => {
        if (errors[errorType]) {
          errorMessages.push(getErrorMessage(fieldControlElement));
        }
      }
    );

    this.manageErrors(fieldControlElement, errorMessages);
    fieldControlElement.ariaInvalid = "true";
    return false;
  }

  onFocus(event) {
    this.manageHint(event.target, true);
  }

  onBlur(event) {
    this.manageHint(event.target, false);

    if (event.target.required || event.target.value.trim() !== "") {
      this.validateField(event.target);
    }
  }

  onInput(event) {
    if (event.target.classList.contains("is-invalid")) {
      this.validateField(event.target);
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const allFields = [...this.form.elements].filter((element) =>
      element.matches("input")
    );
    let isFormValid = true;
    let firstInvalidField = null;

    allFields.forEach((field) => {
      const isFieldValid = this.validateField(field);

      if (!isFieldValid) {
        isFormValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    if (isFormValid) {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      console.log("The form is valid. Sending data:", data);
      document.getElementById("successMessage").style.display = "block";
      this.form.style.display = "none";
    } else {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  }

  bindEvents() {
    this.form.addEventListener("focus", (event) => this.onFocus(event), true);
    this.form.addEventListener("blur", (event) => this.onBlur(event), true);
    this.form.addEventListener("input", (event) => this.onInput(event));
    this.form.addEventListener("submit", (event) => this.onSubmit(event));
  }
}

new FormsValidation();
