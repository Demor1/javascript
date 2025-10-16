class ThemeSwitcher {
  constructor() {
    this.selectors = {
      switchThemeButton: "[data-js-theme-switcher]",
    };
    this.themes = {
      dark: "dark",
      light: "light",
    };
    this.staticClasses = {
      isDarkTheme: "is-dark-theme",
    };
    this.storageKey = "theme";
    this.storageType = "localStorage";

    this.switchThemeButtonElement = document.querySelector(
      this.selectors.switchThemeButton
    );

    if (!this.isStorageAvailable()) {
      console.error(`${this.storageType} is not available.`);
      if (this.switchThemeButtonElement) {
        this.switchThemeButtonElement.disabled = true;
      }
      return;
    }

    this.updateTheme();
    this.bindEvents();
  }

  isStorageAvailable() {
    let storage;
    try {
      storage = window[this.storageType];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  get isDarkThemeCached() {
    return window[this.storageType].getItem(this.storageKey) === this.themes.dark;
  }

  updateTheme = () => {
    document.documentElement.classList.toggle(
      this.staticClasses.isDarkTheme,
      this.isDarkThemeCached
    );
  };

  onClick = () => {
    const newTheme = this.isDarkThemeCached ? this.themes.light : this.themes.dark;

    try {
      window[this.storageType].setItem(this.storageKey, newTheme);
      this.updateTheme();
    } catch (e) {
      console.error("Failed to save theme.", e);
    }
  };

  bindEvents() {
    if (this.switchThemeButtonElement) {
      this.switchThemeButtonElement.addEventListener("click", this.onClick);
    }

    window.addEventListener("storage", (event) => {
      if (event.key === this.storageKey) {
        console.log("Storage changed in another tab.");
        this.updateTheme();
      }
    });
  }
}

new ThemeSwitcher();