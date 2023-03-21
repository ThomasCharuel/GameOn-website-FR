function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

class ModalManager{
  
  constructor() {
    // DOM Elements
    this.modalbg = document.querySelector(".bground");
    this.modalBtn = document.querySelectorAll(".modal-btn");
    this.hideModalBtn = document.querySelectorAll(".close");
    this.formSubmitBtn = document.querySelector('#reserve-form input[type="submit"]');
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
    this.modalbg.style.display = "block";
  }

  // hide modal form
  hide() {
    this.modalbg.style.display = "none";
  }

  // Handle modal form submit
  handleFormSubmit(e) {
    // Loop through form input.
    // Each input must be valid to submit form.
    for (let input of document.querySelectorAll("#reserve-form input")) {
      // If input is not valid, we prevent form from being submitted
      if (!input.checkValidity()) {
        console.log(input)
        console.log("is invalid");
        e.preventDefault();
      }
    }
  } 
}

const modalManager = new ModalManager();
modalManager.setUpModalEvents();