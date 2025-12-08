/**
 * Tip Calculator Application
 *
 * Calculates tip amount and total per person based on bill amount,
 * tip percentage, and number of people splitting the bill.
 *
 * Features:
 * - Real-time validation and calculation
 * - Preset and custom tip percentages
 * - Error handling for invalid inputs
 * - Smart reset button state management
 */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // DOM ELEMENT REFERENCES
  // ========================================

  // Bill input elements
  const billInput = document.getElementById("bill-amount");
  const billError = document.getElementById("bill-error");

  // Tip selection elements
  const tipButtons = document.querySelectorAll(".tip-button");
  const customInput = document.getElementById("custom-amount");
  const tipError = document.getElementById("tip-error");

  // People count elements
  const peopleInput = document.getElementById("num-people");
  const peopleError = document.getElementById("people-error");

  // Output display elements
  const tipPerPerson = document.getElementById("tip-per-person");
  const totalPerPerson = document.getElementById("total-per-person");

  // Reset button
  const resetButton = document.getElementById("reset-button");

  // ========================================
  // APPLICATION STATE
  // ========================================

  /**
   * Current selected tip percentage
   * - Number: Preset tip percentage (5, 10, 15, 25, 50)
   * - "custom": User entered custom percentage
   * - null: No tip selected
   */
  let selectedTipPercent = null;

  /**
   * Interaction flags to track if user has touched each field
   * Used to prevent showing validation errors before user interaction
   */
  let billTouched = false;
  let peopleTouched = false;
  let tipTouched = false;

  // ========================================
  // ERROR HANDLING UTILITIES
  // ========================================

  /**
   * Displays an error message below an input field
   * @param {HTMLElement} element - The error message container
   * @param {string} message - Error message to display
   */
  function showError(element, message) {
    element.textContent = message;
    element.classList.add("visible");
  }

  /**
   * Clears error message and hides error container
   * @param {HTMLElement} element - The error message container
   */
  function clearError(element) {
    element.textContent = "";
    element.classList.remove("visible");
  }

  // ========================================
  // RESET BUTTON STATE MANAGEMENT
  // ========================================

  /**
   * Disables the reset button and applies disabled styling
   */
  function disableResetButton() {
    resetButton.classList.add("disabled");
    resetButton.disabled = true;
  }

  /**
   * Enables the reset button and removes disabled styling
   */
  function enableResetButton() {
    resetButton.classList.remove("disabled");
    resetButton.disabled = false;
  }

  // Initialize reset button as disabled on page load
  disableResetButton();

  /**
   * Checks if any input field has a value and updates reset button state
   * Reset button should be enabled if ANY field has data
   */
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

  // ========================================
  // INPUT VALIDATION FUNCTIONS
  // ========================================

  /**
   * Validates bill amount input
   * @param {string} value - Raw input value from bill field
   * @returns {number|null} Valid bill amount or null if invalid
   *
   * Validation rules:
   * - Must be a number
   * - Must be greater than zero
   * - Shows appropriate error messages
   */
  function validateBill(value) {
    // Don't validate until user has interacted with field
    if (!billTouched) return null;

    const bill = parseFloat(value);

    // Check for invalid inputs
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

  /**
   * Validates number of people input
   * @param {string} value - Raw input value from people field
   * @returns {number|null} Valid number of people or null if invalid
   *
   * Validation rules:
   * - Must be a whole number (integer)
   * - Must be greater than zero
   * - No decimal values allowed
   */
  function validatePeople(value) {
    // Don't validate until user has interacted with field
    if (!peopleTouched) return null;

    const people = parseInt(value, 10);

    if (value.trim() === "") {
      showError(peopleError, "Can't be empty");
      return null;
    }

    // Check if value is a valid positive integer
    if (isNaN(people) || people <= 0) {
      if (people === 0) {
        showError(peopleError, "Can't be zero");
      } else {
        showError(peopleError, "Must be > zero");
      }
      return null;
    }

    // Ensure it's a whole number (no decimals like 2.5 people)
    if (people !== parseFloat(value)) {
      showError(peopleError, "Must be whole number");
      return null;
    }

    clearError(peopleError);
    return people;
  }

  /**
   * Gets the current tip percentage from preset buttons or custom input
   * @returns {number|null} Tip percentage (1-100) or null if invalid
   *
   * Handles two scenarios:
   * 1. Preset tip button selected (5%, 10%, 15%, 25%, 50%)
   * 2. Custom tip percentage entered (1-100%)
   */
  function getTipPercent() {
    // Don't validate until user has interacted with tip selection
    if (!tipTouched) return null;

    if (selectedTipPercent === null) {
      showError(tipError, "Select a tip");
      return null;
    }

    // Handle custom tip input
    if (selectedTipPercent === "custom") {
      const value = customInput.value.trim();
      const customTip = parseFloat(value);

      // Validate custom tip is between 1-100%
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

    // Return preset tip percentage
    clearError(tipError);
    return selectedTipPercent;
  }

  // ========================================
  // TIP SELECTION MANAGEMENT
  // ========================================

  /**
   * Removes active state from all tip buttons
   * Used when switching between preset tips or to custom input
   */
  function clearTipSelection() {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  }

  /**
   * Sets a tip button as active and clears others
   * @param {HTMLElement} btn - Button element to set as active
   */
  function setActiveTipButton(btn) {
    clearTipSelection();
    btn.classList.add("active");
  }

  // ========================================
  // CALCULATION ENGINE
  // ========================================

  /**
   * Main calculation function - validates all inputs and updates display
   *
   * Calculation formula:
   * - Tip per person = (bill × tip%) ÷ people
   * - Total per person = (bill + tip amount) ÷ people
   *
   * If any validation fails, displays $0.00 for both values
   */
  function calculateTip() {
    // Validate all inputs
    const bill = validateBill(billInput.value.trim());
    const people = validatePeople(peopleInput.value.trim());
    const tipPercent = getTipPercent();

    // If any validation fails, reset display to $0.00
    if (bill === null || people === null || tipPercent === null) {
      tipPerPerson.textContent = "$0.00";
      totalPerPerson.textContent = "$0.00";
      return;
    }

    // Calculate tip and total per person
    const tipAmount = (bill * (tipPercent / 100)) / people;
    const totalAmount = (bill + bill * (tipPercent / 100)) / people;

    // Update display with formatted currency (2 decimal places)
    tipPerPerson.textContent = "$" + tipAmount.toFixed(2);
    totalPerPerson.textContent = "$" + totalAmount.toFixed(2);
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  /**
   * Bill input change handler
   * - Marks field as touched
   * - Validates input
   * - Recalculates tip
   * - Updates reset button state
   */
  billInput.addEventListener("input", () => {
    billTouched = true;
    validateBill(billInput.value.trim());
    calculateTip();
    checkResetButtonState();
  });

  /**
   * Number of people input change handler
   * - Marks field as touched
   * - Validates input
   * - Recalculates tip
   * - Updates reset button state
   */
  peopleInput.addEventListener("input", () => {
    peopleTouched = true;
    validatePeople(peopleInput.value.trim());
    calculateTip();
    checkResetButtonState();
  });

  /**
   * Preset tip button click handlers
   * - Marks tip selection as touched
   * - Sets selected tip percentage from data attribute
   * - Clears custom input
   * - Updates active button state
   * - Recalculates tip
   */
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

  /**
   * Custom tip input change handler
   * - Marks tip selection as touched
   * - Sets state to "custom" mode
   * - Clears preset button selection
   * - Recalculates tip
   *
   * Note: If custom input is cleared, resets tip selection to null
   */
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

  /**
   * Reset button click handler
   * Resets entire application to initial state:
   * - Clears all input fields
   * - Resets state flags
   * - Clears tip button selection
   * - Clears all error messages
   * - Resets display to $0.00
   * - Disables reset button
   */
  resetButton.addEventListener("click", () => {
    // Clear all input values
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = "";

    // Reset state flags
    selectedTipPercent = null;
    billTouched = false;
    peopleTouched = false;
    tipTouched = false;

    // Reset UI elements
    clearTipSelection();
    clearError(billError);
    clearError(tipError);
    clearError(peopleError);

    // Reset calculated values display
    tipPerPerson.textContent = "$0.00";
    totalPerPerson.textContent = "$0.00";

    // Disable reset button until user enters data again
    disableResetButton();
  });
});
