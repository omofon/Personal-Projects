document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selections ---
  // Bill Elements
  const billInput = document.getElementById("bill-amount");
  const billError = document.getElementById("bill-error");

  // Tip Elements
  const tipRadioInputs = document.querySelectorAll('input[name="tip-percent"]');
  const customRadio = document.getElementById("tip-custom-radio");
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

  // --- Helper Functions --- //

  function showError(element, message) {
    element.textContent = message;
    element.classList.add("visible");
  }

  function clearError(element) {
    element.textContent = "";
    element.classList.remove("visible");
  }

  /**
   * Validates input fields and returns the parsed value or null on error.
   * Clears or sets the error display.
   */

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

    const people = parseInt(value);

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
    const checkedRadio = document.querySelector(
      'input[name="tip-percent"]:checked'
    );

    if (!checkedRadio) {
      showError(tipError, "Select a tip");
      return null;
    }

    clearError(tipError);

    if (checkedRadio.value === "custom") {
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
      return customTip;
    }

    return parseFloat(checkedRadio.value);
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
    // Convert tip percentage to a decimal (e.g., 15 -> 0.15)
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
    document.getElementById("splitter-form").reset();
    customInput.value = "";

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

  // Listener for Custom Input: Checks the custom radio button and calculates
  customInput.addEventListener("input", () => {
    if (customInput.value.trim() !== "") {
      customRadio.checked = true;
    }
    calculateTip();
  });

  // Listener for all Tip Radio Buttons (Consolidated)
  tipRadioInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio !== customRadio) {
        customInput.value = "";
      }
      calculateTip();
    });
  });

  // Listener for Reset Button (Fix: passing the function reference)
  resetButton.addEventListener("click", resetForm);

  // Initial calculation check (useful if inputs retain values on refresh)
  calculateTip();
});
