document.addEventListener("DOMContentLoaded", () => {
  // Bill Elements
  const billInput = document.getElementById("bill-amount");
  const billError = document.getElementById("bill-error");

  //   Select Radio Elements
  const tipRadios = document.querySelectorAll('input[name="tip-percent"]');
  const customRadio = document.getElementById("tip-custom");
  const customInput = document.getElementById("custom-amount");
  const tipError = document.getElementById("tip-error");

  //   People Number Elements
  const peopleInput = document.getElementById("num-people");
  const peopleError = document.getElementById("people-error");

  //   Output Elements
  const tipPerPerson = document.getElementById("tip-per-person");
  const totalPerPerson = document.getElementById("total-per-person");

  //   Reset Button
  const resetButton = document.getElementById("reset-button");

  /* ==== Input Validation ==== */
  const validators = {
    empty: (value) => value.trim() === "",
    zero: (value) => parseFloat(value) === 0,
    negative: (value) => parseFloat(value) < 0,
  };

  const errorMessages = {
    empty: "Can't be empty",
    zero: "Can't be zero",
    negative: "Invalid input",
  };

  function validateField(input, errorElement) {
    const value = input.value;

    for (const rule in validators) {
      if (validators[rule](value)) {
        errorElement.textContent = errorMessages[rule];
        return false;
      }
    }

    errorElement.textContent = "";
    return true;
  }

  /* ==== Calculation Functions ==== */

});
