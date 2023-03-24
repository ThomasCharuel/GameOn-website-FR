/***
When called, this function toggle a class in the navbar 
to display (or not) the navbar links 
***/
function toggleHiddenNavbar() {
  const navbar = document.querySelector(".topnav");
  navbar.classList.toggle("show-hidden-navbar");
}

class ModalManager  {
  constructor() {
    // DOM Elements
    this.modalbg = document.querySelector(".modal");
    this.modalBtn = document.querySelectorAll(".modal-btn");
    this.hideModalBtn = document.querySelectorAll(".close-modal");
    this.formSubmitBtn = document.querySelector('#reserve-form input[type="submit"]');
    this.form = document.querySelector('#reserve-form');
    this.confirmationScreen = document.querySelector('#confirmation-screen');
  }

  // setup Modal events
  setUpModalEvents() {
    // launch modal event
    this.modalBtn.forEach(btn => btn.addEventListener("click", () => this.launch()));

    // hide modal event
    this.hideModalBtn.forEach(btn => btn.addEventListener("click", () => this.hide()));

    // handle modal form submit
    this.formSubmitBtn.addEventListener("click", (e) => this.handleFormSubmit(e));
  }

  // launch modal form
  launch() {
    this.modalbg.classList.add("show");
    this.confirmationScreen.classList.remove("show");
  }

  // hide modal form
  hide() {
    this.modalbg.classList.remove("show");
  }

  setErrorMessage(htmlElement, message) {
    if (message === null) {
      htmlElement.removeAttribute("data-error");
    } else {
      htmlElement.setAttribute("data-error", message);
    }
  }

  reportFirstnameInputValidity() {
    let errorMessage = null;
    
    const formFielsetElement = document.querySelector(".form-fieldset-firstname");
    const input = formFielsetElement.querySelector("input");

    if (!input.checkValidity()) {
      errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportLastnameInputValidity() {
    let errorMessage = null;
    
    const formFielsetElement = document.querySelector(".form-fieldset-lastname");
    const input = formFielsetElement.querySelector("input");

    if (!input.checkValidity()) {
      errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportEmailInputValidity() {
    let errorMessage = null;
    
    const formFielsetElement = document.querySelector(".form-fieldset-email");
    const input = formFielsetElement.querySelector("input");

    const emailRegex = new RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "gm");

    if (input.value !== "" && !emailRegex.test(input.value)) {
      errorMessage = "Veuillez entrer une adresse électronique valide.";
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportBirthdateInputValidity() {
    let errorMessage = null;

    const formFielsetElement = document.querySelector(".form-fieldset-birthdate");
    const input = formFielsetElement.querySelector("input");

    if (!input.checkValidity()) {
      errorMessage = "Vous devez entrer votre date de naissance.";
    } else {
      // Compute user's age
      const age = new Date(new Date() - new Date(input.value)).getFullYear() - 1970;

      // User must be at least 15 years old
      if (age < 15) {
        errorMessage = "Vous devez avoir au moins 15 ans pour vous inscrire.";
      }
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportQuantityInputValidity() {
    let errorMessage = null;
    
    const formFielsetElement = document.querySelector(".form-fieldset-quantity");
    const input = formFielsetElement.querySelector("input");

    if (!input.checkValidity()) {
      errorMessage = "Veuillez saisir une valeur numérique.";
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportLocationInputValidity() {
    let errorMessage = null;

    const formFielsetElement = document.querySelector(".form-fieldset-location");
    
    for (let input of formFielsetElement.querySelectorAll("input")) {
      if (!input.checkValidity()) {
        errorMessage = "Veuillez sélectionner un tournoi.";
        break;
      }
    }

    this.setErrorMessage(formFielsetElement, errorMessage);
    return errorMessage === null;
  }

  reportTermsAndConditionsInputValidity() {
    let errorMessage = null;

    const formFielsetElement = document.querySelector(".form-fieldset-terms-and-conditions");
    const input = formFielsetElement.querySelector("#terms-and-conditions-input");

    if (!input.checkValidity()) {
      errorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";
    }
    this.setErrorMessage(formFielsetElement, errorMessage);
    
    return errorMessage === null;
  }

  // Handle modal form submit
  handleFormSubmit(e) {
    e.preventDefault(); // Prevent default submit behavior

    // Check form input validity and set error message if needed
    const reportValidityInputs = [
      this.reportFirstnameInputValidity(),
      this.reportLastnameInputValidity(),
      this.reportEmailInputValidity(),
      this.reportBirthdateInputValidity(),
      this.reportQuantityInputValidity(),
      this.reportLocationInputValidity(),
      this.reportTermsAndConditionsInputValidity()
    ]

    // Will be set to false if there is at least one invalid input
    const formIsValid = reportValidityInputs.reduce(
      (a, b) => a && b
    );

    // If form is valid
    if (formIsValid) {
      // Display a confirmation message
      this.confirmationScreen.classList.add("show");
      // Reset form
      document.getElementById("reserve-form").reset();
    }
  }
}

const modalManager = new ModalManager();
modalManager.setUpModalEvents();