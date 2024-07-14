import globalStateInstance from "../globalState";
import displayMessage from "./displayMessage";

function checkEmailValidity(): boolean {
  const emailInput = document.getElementById("email") as HTMLInputElement;
  let validity: { message: string; isValid: boolean; value: string } = {
    message: "",
    isValid: false,
    value: emailInput.value,
  };
  if (emailInput.validity.typeMismatch) {
    validity.message = "Please enter a valid email address.";
  } else if (emailInput.value !== "" && !emailInput.validity.typeMismatch) {
    validity = { ...validity, message: "", isValid: true };
  }
  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(emailInput, validity);
  return validity.isValid;
}

function checkPasswordValidity(): boolean {
  const target = document.getElementById("password") as HTMLInputElement;
  const validity = { message: "", isValid: false, value: target.value };
  if (target.validity.valueMissing) {
    validity.message = "Please input a password.";
  } else {
    validity.isValid = true;
    validity.message = "";
    console.log("Proceed");
  }
  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(target, validity);
  return validity.isValid;
}

function checkPasswordConfirmationValidity(): boolean {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const passwordConfInput = document.getElementById(
    "confPassword",
  ) as HTMLInputElement;
  const validity = { message: "", isValid: false, value: passwordInput.value };
  if (passwordInput.validity.tooLong) {
    validity.message = "Password is too long.";
  } else if (passwordInput.validity.tooShort) {
    validity.message = "Password is too short.";
  } else if (passwordConfInput.validity.valueMissing) {
    validity.message = "Please input your password again.";
  } else if (passwordInput.value !== passwordConfInput.value) {
    validity.message = "Password does not match.";
  } else {
    validity.isValid = true;
    validity.message = "";
  }

  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(passwordInput, validity);
  return validity.isValid;
}

export {
  checkPasswordConfirmationValidity,
  checkPasswordValidity,
  checkEmailValidity,
};
