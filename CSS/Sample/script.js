const contactBtn = document.querySelector(".contact-btn");
const overlay = document.getElementById("overlay");
const closeBtn = document.querySelector(".close-btn");

contactBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.style.display = "none";
});
