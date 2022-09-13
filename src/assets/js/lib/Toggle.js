export default class Toggle {
  constructor(selector) {
    this.btn = document.querySelector(selector);
    this.target = document.querySelector("html");
    this.nav = document.querySelectorAll("#global-nav a[href^='#']");
    this.objectName = selector.substring(4);

    this.btn.addEventListener("click", this._toggle.bind(this));
    this._removeClass();
  }

  _toggle() {
    // aria-expanded 属性の切り替え
    const isExpanded = this.btn.getAttribute("aria-expanded") !== "false";
    this.btn.setAttribute("aria-expanded", !isExpanded);

    this.target.classList.toggle(`is-${this.objectName}Active`);
  }

  // nav aをクリックした時にドロワーメニュー閉じる
  _removeClass() {
    for (let i = 0; i < this.nav.length; i++) {
      this.nav[i].addEventListener("click", () => {
        this.target.classList.remove(`is-${this.objectName}Active`);
        this.btn.setAttribute("aria-expanded", false);
      });
    }
  }
}
