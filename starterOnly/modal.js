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
const inputLastName = document.getElementById("last");
const inputEmail = document.querySelector("#email");
const messageInvalid = document.querySelectorAll(".messageInvalid");
const birthDate = document.getElementById("birthdate");
const numberTournament = document.getElementById("quantity");
const radioContainer = document.getElementById("radioContainer");
const inputRadio = document.querySelectorAll('input[name="location"]');
const requiredCheckBox = document.getElementById("checkbox1");
const Event = document.getElementById("checkbox2");
const thanksModal = document.getElementById("thanksModal");
const formContainer = document.getElementById("formContainer");
const btnClose = document.querySelector(".btn-close");

// Gobal var
let selectedCity;
let nextEvent;
let fullChecked = 0;
let error = 0;

// Regex
// Test valid name and last name
function regexNameAndLastName(value) {
  const regex = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/g;
  return regex.test(value);
}
// Test valid email
function regexEmail(value) {
  const regex =
    /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/gm;
  return regex.test(value);
}
// Test valid birthdate
function regexDate(value) {
  const regex = /\d{4}-\d{2}-\d{2}/;
  return regex.test(value);
}
// Test valid number
function regexNumber(value) {
  const regex = /^[0-9]{0,2}$/;
  return regex.test(value);
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalContent.style.display = "block";
  formContainer.style.display = "block";
  thanksModal.style.display = "none";
  error = 0;
}

// Close modal form
closeModal.addEventListener("click", () => {
  modalContent.style.display = "none";
  modalbg.style.display = "none";
});

// Check if value was stock in local storage
function checkItemsInLocalStorage(key, value) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
  }
}

// Loop on all radio button
function ButtonCity() {
  fullChecked = 0;
  for (const radioButton of inputRadio) {
    if (radioButton.checked) {
      fullChecked++;
      selectedCity = radioButton.value;
    }
  }
  if (fullChecked === 1) {
    messageInvalid[5].style.display = "none";
  } else {
    messageInvalid[5].style.display = "block";
    error++;
  }
}

// Check valid name input
function Name() {
  let name = inputName.value;
  if (regexNameAndLastName(name) === true) {
    inputName.classList.remove("inputInvalid");
    messageInvalid[0].style.display = "none";
  } else {
    inputName.classList.add("inputInvalid");
    messageInvalid[0].style.display = "block";
    error++;
  }
}

// Check valid Lastname input
function LastName() {
  let lastName = inputLastName.value;
  if (regexNameAndLastName(lastName) === true) {
    inputLastName.classList.remove("inputInvalid");
    messageInvalid[1].style.display = "none";
  } else {
    inputLastName.classList.add("inputInvalid");
    messageInvalid[1].style.display = "block";
    error++;
  }
}

// Check valid email input
function Email() {
  let email = inputEmail.value;
  if (regexEmail(email) === true) {
    inputEmail.classList.remove("inputInvalid");
    messageInvalid[2].style.display = "none";
  } else {
    inputEmail.classList.add("inputInvalid");
    messageInvalid[2].style.display = "block";
    error++;
  }
}

// Check valid date input
function BirthDate() {
  let date = birthDate.value;
  if (regexDate(date) === true) {
    birthDate.classList.remove("inputInvalid");
    messageInvalid[3].style.display = "none";
  } else {
    birthDate.classList.add("inputInvalid");
    messageInvalid[3].style.display = "block";
    error++;
  }
}

// Check valid tournament input
function Tournamanent() {
  let number = numberTournament.value;
  if (regexNumber(number) === true) {
    numberTournament.classList.remove("inputInvalid");
    messageInvalid[4].style.display = "none";
  } else {
    numberTournament.classList.add("inputInvalid");
    messageInvalid[4].style.display = "block";
    error++;
  }
}

// Check if checkbox was checked
function RequiredCheckBox() {
  if (!requiredCheckBox.checked) {
    messageInvalid[6].style.display = "block";
    error++;
  } else {
    messageInvalid[6].style.display = "none";
  }
}

// Check value event
function CheckBoxBonus() {
  if (Event.checked) {
    nextEvent = Event.value;
  } else {
    nextEvent = Event.value;
  }
}

// Function to Submit Form
function submitForm() {
  error = 0;
  Name();
  LastName();
  Email();
  BirthDate();
  Tournamanent();
  ButtonCity();
  RequiredCheckBox();
  CheckBoxBonus();

  // Check error on all input
  if (error === 0) {
    let name = inputName.value;
    let lastName = inputLastName.value;
    let email = inputEmail.value;
    let date = birthDate.value;
    let tournament = numberTournament.value;
    let condition = requiredCheckBox.value;

    checkItemsInLocalStorage("name", name);
    checkItemsInLocalStorage("lastName", lastName);
    checkItemsInLocalStorage("email", email);
    checkItemsInLocalStorage("birthDate", date);
    checkItemsInLocalStorage("tournament", tournament);
    checkItemsInLocalStorage("selectedCity", selectedCity);
    checkItemsInLocalStorage("condition", condition);
    checkItemsInLocalStorage("nextEvent", nextEvent);
    showThanksModal();
  }
}

// Stop the propagation who close the modal after submit
function handleForm(event) {
  event.preventDefault();
}
formContainer.addEventListener("submit", handleForm);

// Show the thank's modal
function showThanksModal() {
  formContainer.style.display = "none";
  thanksModal.style.display = "flex";
}

// Close thanksModal
btnClose.addEventListener("click", () => {
  modalContent.style.display = "none";
  modalbg.style.display = "none";
  thanksModal.style.display = "none";
});
