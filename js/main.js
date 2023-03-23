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
    this.modalbg = document.querySelector(".bground");
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

  // Handle modal form submit
  handleFormSubmit(e) {
    e.preventDefault(); // Prevent default submit behavior
    // Will be set to false if there is at least one invalid input
    let formIsValid = true;

    // Loop through form input.
    // Each input must be valid to submit form.
    for (let formDataInput of this.formData) {
      for (let input of formDataInput.querySelectorAll("input")) {
        // If input is not valid, we prevent form from being submitted
        if (!input.checkValidity()) {
          formIsValid = false;
          
          // Add error message based on input name
          switch (input.getAttribute("name")) {
            case "first":
              formDataInput.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
              break;
            case "last":
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

          // Set "data-error-visible" attribute to display error message
          formDataInput.setAttribute("data-error-visible", "true");
            
          break; // Stop the loop with the first invalid input
        } else {
          // Remove error message if previously set
          formDataInput.removeAttribute("data-error-visible");
          formDataInput.removeAttribute("data-error");
        }
      }
    }

    // If form is valid we display a confirmation message
    if (formIsValid) {
      this.confirmationScreen.classList.add("show");
    }
  }
}

const modalManager = new ModalManager();
modalManager.setUpModalEvents();