function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const hideModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

class ModalManager{
  // setup Modal events
  setUpModalEvents() {
    // launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", this.launchModal));

    // hide modal event
    hideModalBtn.forEach((btn) => btn.addEventListener("click", this.hideModal));
  }

  // launch modal form
  launchModal() {
    modalbg.style.display = "block";
  }

  // hide modal form
  hideModal() {
    modalbg.style.display = "none";
  }
}

const modalManager = new ModalManager();
modalManager.setUpModalEvents();