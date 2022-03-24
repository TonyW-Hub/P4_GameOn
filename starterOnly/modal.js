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
const formData = document.querySelectorAll(".formData");
const modalContent = document.querySelector(".content");
const closeModal = document.querySelector(".close");
const inputName = document.querySelector("#first");
const inputLastName = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const messageInvalid = document.querySelectorAll(".messageInvalid");
const birthDate = document.getElementById("birthdate");
const numberTournament = document.getElementById("quantity");
const radioContainer = document.getElementById("radioContainer");
const inputRadio = document.querySelectorAll('input[name="location"]');
const requiredCheckBox = document.getElementById('checkbox1');
const Event = document.getElementById('checkbox2');
const btnSubmit = document.querySelector(".btn-submit");
const thanksModal = document.getElementById('thanksModal');
const formContainer = document.getElementById("formContainer");
const btnClose = document.querySelector('.btn-close');

// Regex
let regexName = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/g;
let regexLastName = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/g;
let regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
let regexDate = /\d{4}-\d{2}-\d{2}/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Gobal var
let selectedCity;
let nextEvent;

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalContent.style.display = "block";
  formContainer.style.display = "block";
  thanksModal.style.display = "none";
  loopButtonCity();
}

// Close modal form
closeModal.addEventListener("click", () => {
  modalContent.style.display = "none";
  modalbg.style.display = "none";
});

// Test valid name
function validName(name) {
  return regexName.test(name);
}
// Test valid Lastname
function validLastName(lastName) {
  return regexLastName.test(lastName);
}
// Test valid email
function validEmail(email) {
  return regexEmail.test(email);
}
// Test valid birthdate
function validDate(date) {
  return regexDate.test(date);
}

// Check if value was stock in local storage
function checkItemsInLocalStorage(key, value) {
  if (localStorage.getItem(key, value) === null) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key, value);
    localStorage.setItem(key, value);
  }
}

// Loop on all radio button
function loopButtonCity() {
  for (const radioButton of inputRadio) {
    if (radioButton.checked) {
      selectedCity = radioButton.value;
    }
  }
}

// Check validity radio button
function validButtonCity() {
  if (selectedCity == undefined || '') {
    messageInvalid[5].style.display = "block";
    btnSubmit.disabled = true;
  } else {
    messageInvalid[5].style.display = "none";
    btnSubmit.disabled = false;
  }
}

// Check valid name input
inputName.addEventListener("change", () => {
  if (validName(inputName.value) == true) {
    inputName.classList.remove("inputInvalid");
    messageInvalid[0].style.display = "none";
  } else {
    inputName.classList.add("inputInvalid");
    messageInvalid[0].style.display = "block";
    inputName.value = "";
  }
});

// Check valid Lastname input
inputLastName.addEventListener("change", () => {
  if (validLastName(inputLastName.value) == true) {
    inputLastName.classList.remove("inputInvalid");
    messageInvalid[1].style.display = "none";
  } else {
    inputLastName.classList.add("inputInvalid");
    messageInvalid[1].style.display = "block";
    inputLastName.value = "";
  }
});

// Check valid email input
inputEmail.addEventListener("change", () => {
  if (validEmail(inputEmail.value) == true) {
    inputEmail.classList.remove("inputInvalid");
    messageInvalid[2].style.display = "none";
  } else {
    inputEmail.classList.add("inputInvalid");
    messageInvalid[2].style.display = "block";
  }
});

// Check valid date input
birthDate.addEventListener("change", () => {
  if (validDate(birthDate.value) == true) {
    birthDate.classList.remove("inputInvalid");
    messageInvalid[3].style.display = "none";
  } else {
    birthDate.classList.add("inputInvalid");
    messageInvalid[3].style.display = "block";
  }
});

// Check valid tournament input
numberTournament.addEventListener("change", () => {
  if (numberTournament.value >= 0) {
    numberTournament.classList.remove("inputInvalid");
    messageInvalid[4].style.display = "none";
  } else {
    numberTournament.classList.add("inputInvalid");
    messageInvalid[4].style.display = "block";
  }
});

// Check valid input city
radioContainer.addEventListener("change", () => {
  loopButtonCity();
  validButtonCity();
});

// Check if checkbox was checked
requiredCheckBox.addEventListener("change", () => {
  if (!requiredCheckBox.checked) {
    messageInvalid[6].style.display = "block";
    btnSubmit.disabled = true
  } else {
    messageInvalid[6].style.display = "none";
    btnSubmit.disabled = false
  }
})

// Check value event
Event.addEventListener("change", () => {
  if (Event.checked) {
    nextEvent = Event.value
  } else {
    nextEvent = Event.value
  }
})

// Button Submit Form
btnSubmit.addEventListener("click", () => {
  validButtonCity();
  let name = inputName.value
  let lastName = inputLastName.value
  let email = inputEmail.value
  let date = birthDate.value
  let tournament = numberTournament.value
  let condition = requiredCheckBox.value

  checkItemsInLocalStorage("name", name);
  checkItemsInLocalStorage("lastName", lastName);
  checkItemsInLocalStorage("email", email);
  checkItemsInLocalStorage("birthDate", date);
  checkItemsInLocalStorage("tournament", tournament);
  checkItemsInLocalStorage("selectedCity", selectedCity);
  checkItemsInLocalStorage("condition", condition);
  checkItemsInLocalStorage("nextEvent", nextEvent);
});

// Stop the propagation who close the modal after submit
function handleForm(event) {
  event.preventDefault();
}
formContainer.addEventListener('submit', handleForm);

// Show the thank's modal
function showThanksModal() {
  formContainer.style.display = "none";
  thanksModal.style.display = "flex";
}

// Close thanksModal
btnClose.addEventListener('click', () => {
  modalContent.style.display = "none";
  modalbg.style.display = "none";
  thanksModal.style.display = "none";
})