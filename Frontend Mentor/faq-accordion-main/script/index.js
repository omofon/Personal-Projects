document.addEventListener("DOMContentLoaded", () => {
  // Constants
  const SELECTORS = {
    buttons: ".faq__question-button",
    plusIcon: ".icon-plus",
    minusIcon: ".icon-minus",
  };

  const ARIA_ATTRS = {
    expanded: "aria-expanded",
    controls: "aria-controls",
  };

  const faqButtons = document.querySelectorAll(SELECTORS.buttons);

  /**
   * Toggles element visibility
   */
  function toggleVisibility(element, shouldShow) {
    if (!element) return;
    element.hidden = !shouldShow;
  }

  /**
   * Toggles FAQ item state
   */
  function toggleFaqItem(button) {
    const isExpanded = button.getAttribute(ARIA_ATTRS.expanded) === "true";
    const shouldExpand = !isExpanded;

    button.setAttribute(ARIA_ATTRS.expanded, String(shouldExpand));

    const plusIcon = button.querySelector(SELECTORS.plusIcon);
    const minusIcon = button.querySelector(SELECTORS.minusIcon);
    toggleVisibility(plusIcon, !shouldExpand);
    toggleVisibility(minusIcon, shouldExpand);

    const answerId = button.getAttribute(ARIA_ATTRS.controls);
    const answer = answerId ? document.getElementById(answerId) : null;
    if (answer) {
      toggleVisibility(answer, shouldExpand);
    }
  }

  // Event listeners
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => toggleFaqItem(button));
  });
});
