document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selections ---
  // Bill Elements
  const billInput = document.getElementById("bill-amount");
  const billError = document.getElementById("bill-error");

  // Tip Elements
  const tipButtons = document.querySelectorAll(".tip-button");
  const customInput = document.getElementById("custom-amount");
  const tipError = document.getElementById("tip-error");

  // People Number Elements
  const peopleInput = document.getElementById("num-people");
  const peopleError = document.getElementById("people-error");

  // Output Elements
  const tipPerPerson = document.getElementById("tip-per-person");
  const totalPerPerson = document.getElementById("total-per-person");

  // Reset Button
  const resetButton = document.getElementById("reset-button");

  // --- State Management ---
  let selectedTipPercent = null;

  // --- Helper Functions --- //

  function showError(element, message) {
    element.textContent = message;
    element.classList.add("visible");
  }

  function clearError(element) {
    element.textContent = "";
    element.classList.remove("visible");
  }

  // Checks if Bill input is Valid
  function validateBill(value) {
    if (value === "") {
      showError(billError, "Can't be empty");
      return null;
    }

    const bill = parseFloat(value);

    if (isNaN(bill) || bill <= 0) {
      showError(billError, "Must be > zero");
      return null;
    }

    clearError(billError);
    return bill;
  }

  // Checks if People input is valid
  function validatePeople(value) {
    if (value === "") {
      showError(peopleError, "Can't be empty");
      return null;
    }

    const people = parseInt(value, 10);

    // Checks for NaN or non-positive number
    if (isNaN(people) || people < 1) {
      showError(peopleError, "Must be at least 1");
      return null;
    }

    if (people !== parseFloat(value)) {
      showError(peopleError, "Must be whole number");
      return null;
    }

    clearError(peopleError);
    return people;
  }

  // Gets the selected tip percentage value
  function getTipPercent() {
    if (selectedTipPercent === null) {
      showError(tipError, "Select a tip");
      return null;
    }

    // Validate custom input if that's what's selected
    if (selectedTipPercent === "custom") {
      const value = customInput.value.trim();
      const customTip = parseFloat(value);

      if (
        value === "" ||
        isNaN(customTip) ||
        customTip < 1 ||
        customTip > 100
      ) {
        showError(tipError, "1 - 100%");
        return null;
      }

      clearError(tipError);
      return customTip;
    }

    clearError(tipError);
    return selectedTipPercent;
  }

  // Clears active state from all tip buttons
  function clearTipSelection() {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  }

  // Sets a tip button as active
  function setActiveTipButton(button) {
    clearTipSelection();
    button.classList.add("active");
  }

  // Renders tip/person and total/person
  function calculateTip() {
    // 1. Get and Validate all necessary values (using null for invalid)
    const bill = validateBill(billInput.value.trim());
    const people = validatePeople(peopleInput.value.trim());
    const tipPercent = getTipPercent();

    // 2. Check validity
    if (bill === null || tipPercent === null || people === null) {
      tipPerPerson.textContent = "$0.00";
      totalPerPerson.textContent = "$0.00";
      return;
    }

    // 3. Calculation (tipPercent is already validated to be a number)
    const tipFactor = tipPercent / 100;
    const tipAmount = bill * tipFactor;
    const totalAmount = bill + tipAmount;

    const tipPer = tipAmount / people;
    const totalPer = totalAmount / people;

    // 4. Display with $ and 2 decimals
    tipPerPerson.textContent = "$" + tipPer.toFixed(2);
    totalPerPerson.textContent = "$" + totalPer.toFixed(2);
  }

  // Function for reset button
  function resetForm() {
    // Clear inputs
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = "";

    // Clear tip selection state
    selectedTipPercent = null;
    clearTipSelection();

    // Clear outputs
    tipPerPerson.textContent = "$0.00";
    totalPerPerson.textContent = "$0.00";

    // Clear all errors
    clearError(billError);
    clearError(tipError);
    clearError(peopleError);
  }

  // --- Event Listeners --- //

  // Listeners for Bill and People: Trigger calculation directly on input
  billInput.addEventListener("input", calculateTip);
  peopleInput.addEventListener("input", calculateTip);

  // Tip Button Click Handlers
  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Set the selected tip from data attribute
      selectedTipPercent = parseFloat(button.dataset.tip);

      // Update visual state
      setActiveTipButton(button);

      // Clear custom input
      customInput.value = "";

      // Recalculate
      calculateTip();
    });
  });

  // Custom Input Handler
  customInput.addEventListener("input", () => {
    if (customInput.value.trim() !== "") {
      // Mark that custom is selected
      selectedTipPercent = "custom";

      // Clear button selection
      clearTipSelection();

      // Recalculate
      calculateTip();
    } else {
      // If custom input is cleared, reset tip selection
      selectedTipPercent = null;
      calculateTip();
    }
  });

  // Reset Button Listener
  resetButton.addEventListener("click", resetForm);

  // Initial calculation check (useful if inputs retain values on refresh)
  calculateTip();
});
