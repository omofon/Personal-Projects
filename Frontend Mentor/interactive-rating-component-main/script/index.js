document.addEventListener("DOMContentLoaded", () => {
  // DOM Nodes Assignment
  const ratingForm = document.getElementById("rating-form");
  const ratingButtons = document.querySelectorAll('button[role="radio"]');
  const submitButton = document.getElementById("submit-button");

  const ratingCard = document.getElementById("rating-card");
  const thankYouCard = document.getElementById("thank-you-card");
  const selectedRatingSpan = document.getElementById("selected-rating");

  // Selected rating button
  let selectedRating = null;

  //   Disable Submit Button
  function disableSubmitButton() {
    submitButton.classList.add("disabled");
    submitButton.disabled = true;
  }

  //   Enable Submit Button
  function enableSubmitButton() {
    submitButton.classList.remove("disabled");
    submitButton.disabled = false;
  }

  disableSubmitButton();

  // Transition to thank you card
  function transitionToThankYou(rating) {
    selectedRatingSpan.textContent = rating;

    ratingCard.hidden = true;
    thankYouCard.hidden = false;
  }

  // Remove active from any rating button
  function clearRatingSelection() {
    ratingButtons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-checked", "false");
    });
  }

  // Set a clicked button to active
  function setActiveRatingButton(button) {
    clearRatingSelection();
    button.classList.add("active");
    button.setAttribute("aria-checked", "true");
  }

  //   Rating button click handlers
  ratingButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveRatingButton(e.currentTarget);
      enableSubmitButton();
      selectedRating = button.value;
    });
  });

  //   Form submit handler
  ratingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (selectedRating) {
      transitionToThankYou(selectedRating);
    }
  });
});
