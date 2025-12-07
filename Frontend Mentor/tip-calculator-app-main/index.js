document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selections --- //
  const billInput = document.getElementById("bill-amount");
  const billError = document.getElementById("bill-error");

  const tipButtons = document.querySelectorAll(".tip-button");
  const customInput = document.getElementById("custom-amount");
  const tipError = document.getElementById("tip-error");

  const peopleInput = document.getElementById("num-people");
  const peopleError = document.getElementById("people-error");

  const tipPerPerson = document.getElementById("tip-per-person");
  const totalPerPerson = document.getElementById("total-per-person");

  const resetButton = document.getElementById("reset-button");

  // --- State Flags --- //
  let selectedTipPercent = null;
  let billTouched = false;
  let peopleTouched = false;
  let tipTouched = false;

  // --- Helpers --- //

  function showError(element, message) {
    element.textContent = message;
    element.classList.add("visible");
  }

  function clearError(element) {
    element.textContent = "";
    element.classList.remove("visible");
  }

  function disableResetButton() {
    resetButton.classList.add("disabled");
    resetButton.disabled = true;
  }

  function enableResetButton() {
    resetButton.classList.remove("disabled");
    resetButton.disabled = false;
  }

  // Disables reset button on load
  disableResetButton();

  // Checks if any field isn't empty, then enables reset else disable
  function checkResetButtonState() {
    const billEmpty = billInput.value.trim() === "";
    const peopleEmpty = peopleInput.value.trim() === "";
    const customEmpty = customInput.value.trim() === "";
    const tipActive = document.querySelector(".tip-button.active");

    const shouldBeEnabled =
      !billEmpty || !peopleEmpty || !customEmpty || tipActive;

    if (shouldBeEnabled) {
      enableResetButton();
    } else {
      disableResetButton();
    }
  }

  // --- Validation Functions --- //
  function validateBill(value) {
    if (!billTouched) return null;

    const bill = parseFloat(value);

    if (isNaN(bill) || bill <= 0) {
      if (value.trim() === "") {
        showError(billError, "Can't be empty");
      } else if (bill <= 0) {
        showError(billError, "Must be > zero");
      } else {
        showError(billError, "Invalid number");
      }
      return null;
    }

    clearError(billError);
    return bill;
  }

  function validatePeople(value) {
    if (!peopleTouched) return null;

    const people = parseInt(value, 10);

    if (value.trim() === "") {
      showError(peopleError, "Can't be empty");
      return null;
    }

    if (isNaN(people) || people <= 0) {
      if (people === 0) {
        showError(peopleError, "Can't be zero");
      } else {
        showError(peopleError, "Must be > zero");
      }
      return null;
    }

    if (people !== parseFloat(value)) {
      showError(peopleError, "Must be whole number");
      return null;
    }

    clearError(peopleError);
    return people;
  }

  function getTipPercent() {
    if (!tipTouched) return null;

    if (selectedTipPercent === null) {
      showError(tipError, "Select a tip");
      return null;
    }

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

  // --- Tip Selection --- //
  function clearTipSelection() {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  }

  function setActiveTipButton(btn) {
    clearTipSelection();
    btn.classList.add("active");
  }

  // --- Calculation --- //
  function calculateTip() {
    const bill = validateBill(billInput.value.trim());
    const people = validatePeople(peopleInput.value.trim());
    const tipPercent = getTipPercent();

    if (bill === null || people === null || tipPercent === null) {
      tipPerPerson.textContent = "$0.00";
      totalPerPerson.textContent = "$0.00";
      return;
    }

    const tipAmount = (bill * (tipPercent / 100)) / people;
    const totalAmount = (bill + bill * (tipPercent / 100)) / people;

    tipPerPerson.textContent = "$" + tipAmount.toFixed(2);
    totalPerPerson.textContent = "$" + totalAmount.toFixed(2);
  }

  // --- Event Listeners --- //
  billInput.addEventListener("input", () => {
    billTouched = true;
    validateBill(billInput.value.trim());
    calculateTip();
    checkResetButtonState();
  });

  peopleInput.addEventListener("input", () => {
    peopleTouched = true;
    validatePeople(peopleInput.value.trim());
    calculateTip();
    checkResetButtonState();
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipTouched = true;
      selectedTipPercent = parseFloat(button.dataset.tip);

      setActiveTipButton(button);
      customInput.value = "";

      calculateTip();
      checkResetButtonState();
    });
  });

  customInput.addEventListener("input", () => {
    tipTouched = true;

    if (customInput.value.trim() !== "") {
      selectedTipPercent = "custom";
      clearTipSelection();
    } else {
      selectedTipPercent = null;
    }

    calculateTip();
    checkResetButtonState();
  });

  resetButton.addEventListener("click", () => {
    // Reset all fields
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = "";

    // Reset state variables
    selectedTipPercent = null;
    billTouched = false;
    peopleTouched = false;
    tipTouched = false;

    // Reset UI
    clearTipSelection();
    clearError(billError);
    clearError(tipError);
    clearError(peopleError);

    tipPerPerson.textContent = "$0.00";
    totalPerPerson.textContent = "$0.00";

    // Re-disables the button
    disableResetButton();
  });
});
