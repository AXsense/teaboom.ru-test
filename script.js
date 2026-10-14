const options = [...document.querySelectorAll(".package-option")];
const selectedSize = document.querySelector("#selected-size");
const selectedSku = document.querySelector("#selected-sku");
const feedback = document.querySelector("#cart-feedback");
const cartCount = document.querySelector(".cart-count");
let cartItems = 0;

//единый формат отображения цены при динамических данных
function formatPrice(value) {
  return (
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(
      Number(value),
    ) + " ₽"
  );
}
//обновление визуала фасовки и данных рядом с кнопкой "В корзину"
function selectPackage(option) {
  options.forEach((item) => {
    const active = item === option;
    item.setAttribute("aria-checked", String(active));
  });
  selectedSize.textContent = `${option.dataset.size} г`;
  selectedSku.textContent = option.dataset.sku;
}
options.forEach((option, index) => {
  option.addEventListener("click", () => selectPackage(option));
  option.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const next = options[(index + 1) % options.length];
      selectPackage(next);
      next.focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const previous = options[(index - 1 + options.length) % options.length];
      selectPackage(previous);
      previous.focus();
    }
  });
});

//демонстрация корзины
document.querySelector("#add-to-cart").addEventListener("click", () => {
  cartItems += 1;
  cartCount.textContent = cartItems;
  feedback.textContent = `Добавлено в корзину: ${selectedSize.textContent} · арт. ${selectedSku.textContent}`;
});

const favorite = document.querySelector("#favorite-button");
favorite.addEventListener("click", () => {
  const active = favorite.getAttribute("aria-pressed") !== "true";
  favorite.setAttribute("aria-pressed", String(active));
  favorite.textContent = active ? "❤️" : "🤍";
});
const modal = document.querySelector("#image-modal");
document
  .querySelector("#zoom-button")
  .addEventListener("click", () => modal.showModal());
document
  .querySelector("#modal-close")
  .addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

const tabs = [...document.querySelectorAll(".tab")];
const panel = document.querySelector("#tab-panel");
const tabContent = {
  description: `<p>Состав: китайский бирюзовый чай, цукаты, натуральные ароматические масла. Светлый Фуцзяньский улун с ароматом ананаса. В сухом виде — красивый крупный лист изумрудного цвета, скруткой листа напоминающий Те Гуань Инь. В прогретой посуде раскрываются кусочки спелого ананаса и нежная чайная нота.</p><h3>Вкус</h3><p>Настой прозрачный, светло-янтарного цвета. Классическая нота светлого фуцзяньского улуна переплетается с яркой ананасовой нотой.</p><h3>Полезные свойства</h3><ul><li>отличный антиоксидант</li><li>снижает уровень холестерина</li><li>помогает разнообразить ежедневное чаепитие</li></ul>`,
  properties: `<ul><li>Тип чая: улун</li><li>Страна происхождения: Китай</li><li>Вкус: ананасовый, фруктовый</li><li>Форма выпуска: рассыпной листовой чай</li><li>Температура заваривания: 85–90 °C</li></ul>`,
  reviews: `<h3>Отзывы покупателей</h3><p>Пока отзывов нет. Попробуйте этот чай и поделитесь впечатлениями!</p><a href="#product-title">Оставить отзыв</a>`,
};
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    panel.innerHTML = tabContent[tab.dataset.tab];
  }),
);
document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = event.currentTarget.querySelector("input").value.trim();
  if (value) alert(`Демо-поиск: «${value}»`);
});
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.textContent = opened ? "×" : "☰";
});
const toTop = document.querySelector("#to-top");
window.addEventListener("scroll", () =>
  toTop.classList.toggle("visible", window.scrollY > 450),
);
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
