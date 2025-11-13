const tabs = document.querySelectorAll(".tab-btn");
const allContent = document.querySelectorAll(".content");
const line = document.querySelector(".line");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    // Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    // Move underline
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    // Show corresponding content
    allContent.forEach((content) => content.classList.remove("active"));
    allContent[index].classList.add("active");
  });
});
