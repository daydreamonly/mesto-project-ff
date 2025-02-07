function showInputError(
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(inputElement, inputErrorClass, errorClass) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(
  inputElement,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputButtonList = document.querySelectorAll(submitButtonSelector);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
    inputButtonList.forEach((inputButtonElement) => {
      inputButtonElement.classList.add(inactiveButtonClass);
    });
  } else {
    hideInputError(inputElement, inputErrorClass, errorClass);
    inputButtonList.forEach((inputButtonElement) => {
      inputButtonElement.classList.remove(inactiveButtonClass);
    });
  }
}

function setEventListeners(
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        inputElement,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
      );
    });
  });
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
}

function clearValidation(
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) {
  const inputElement = formElement.querySelector(inputSelector);
  const inputButtonList = formElement.querySelectorAll(submitButtonSelector);
  inputButtonList.forEach((inputButtonElement) => {
    inputButtonElement.classList.add(inactiveButtonClass);
  });

  hideInputError(inputElement, inputErrorClass, errorClass);
}

export { enableValidation, clearValidation };
