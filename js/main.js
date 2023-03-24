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
    this.formData = document.querySelectorAll(".formData");
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

  checkValidityBirthdate(birthdateInput) {
    const birthdate = new Date(birthdateInput.value);
    // Compute age of the user
    const years = new Date(new Date() - new Date(birthdate)).getFullYear() - 1970;

    // Check that age is at least 15
    return years >= 15;
  }

  // Handle modal form submit
  handleFormSubmit(e) {
    e.preventDefault(); // Prevent default submit behavior
    // Will be set to false if there is at least one invalid input
    let formIsValid = true;

    // Loop through form input.
    // Each input must be valid to submit form.
    for (let formDataInput of this.formData) {
      for (let input of formDataInput.querySelectorAll("input")) {
        // Display error messages based on the input
        // Input not valid
        const input_not_valid = !input.checkValidity();

        // Input is birthdate and birthdate not valid
        const birthdate_not_valid = (
          input.getAttribute("name") === "birthdate" && !this.checkValidityBirthdate(input));

        // If input is not valid, we prevent form from being submitted
        if (input_not_valid) {
          formIsValid = false;
          
          // Add error message based on input name
          switch (input.getAttribute("name")) {
            case "firstname":
              formDataInput.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
              break;
            case "lastname":
              formDataInput.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
              break;
            case "email":
              formDataInput.setAttribute("data-error", "Veuillez entrer une adresse électronique valide.");
              break;
            case "birthdate":
              formDataInput.setAttribute("data-error", "Vous devez entrer votre date de naissance.");
              break;
            case "quantity":
              formDataInput.setAttribute("data-error", "Veuillez saisir une valeur numérique.");
              break;
            case "location":
              formDataInput.setAttribute("data-error", "Veuillez sélectionner un tournoi.");
              break;
            case "checkbox1":
              formDataInput.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
              break;
          }
        } else if (birthdate_not_valid) {
          formDataInput.setAttribute("data-error", "Vous devez avoir au moins 15 ans pour vous inscrire.");
        } else {
          // Remove error message if previously set
          formDataInput.removeAttribute("data-error");
        }
        break; // Stop the loop with the first invalid input
      }
    }

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