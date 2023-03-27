function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

/////// FUNCTION CHECK INPUT DATA ///////////
// Control Form Map
const controlForm = new Map();

// fct check value into input type=text with min 2 characters
function checkInputText(element) {
  if (element.value.length < 2) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ " +
        element.previousElementSibling.innerText
    );
    controlForm.delete(element.name);
  } else if (
    // regex text with no integer but with accent into first name for exemple
    !/^[a-zéèçàö]{2,50}(-| )?([a-zéèçàö]{2,50})?$/i.test(element.value)
  ) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer uniquement du texte pour ce champ."
    );
    controlForm.delete(element.name);
  } else {
    dataChecked(element);
    // add into controlForm Map to future send data
    controlForm.set(element.name, element.value);
  }
}

// fct check value into input type="email"
function checkValueEmail(element) {
  // control data with regex mail
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.value)) {
    dataError(element);
    controlForm.delete(element.name);
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez saisir une adresse mail valide."
    );
  } else {
    dataChecked(element);
    controlForm.set(element.name, element.value);
  }
}

/////// FUNCTION SIGNAL TO USER IF DATA SUCCESS OR DATA ERROR ///////////
// set green background and clean attribute data-error
function dataChecked(element) {
  element.classList.remove("bg-error");
  element.classList.add("bg-checked");
  element.parentElement.removeAttribute("data-error-visible");
  element.parentElement.removeAttribute("data-error");
}

//set red background  and set attribute data-error
function dataError(element) {
  element.parentElement.setAttribute("data-error-visible", "true");
  element.classList.add("bg-error");
  element.classList.remove("bg-checked");
}

// exit modal form

/////// FUNCTIONS CONTROL IF FORM IS VALID TO SEND ///////////
let btnSubmit = document.getElementsByClassName("btn-submit")[0];
// Check if all input is validated
function checkForm(element) {
  let formDiv = document.querySelector("form").childNodes;
  // iteration to launch function associed to control every input
  for (const child of formDiv) {
    if (child.attributes !== undefined) {
      if (child.attributes.class.nodeValue === "formData") {
        // in form, select only div class=formDATA
        if (
          child.lastElementChild !== undefined &&
          child.lastElementChild.name !== undefined
        ) {
          if (
            child.lastElementChild.name === "lastname" ||
            child.lastElementChild.name === "firstname" ||
            child.lastElementChild.name === "msg"
          ) {
            checkInputText(child.lastElementChild);
          } else if (child.lastElementChild.name === "email") {
            checkValueEmail(child.lastElementChild);
          }
        }
      }
    }
  }
  // after every function check, check of controlForm Map contains all necessary data to send form
  if (controlForm.size < 4) {
    element.classList.add("btn-submit-disabled");
    element.parentElement.setAttribute("data-error-visible", "true");
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez remplir tous les éléments : reste " +
        (4 - controlForm.size) +
        " à remplir !"
    );
    // disactivate button to unautorize submit (update propriety type submit => buttom)

    btnSubmit.setAttribute("type", "button");
  } else {
    element.classList.remove("btn-submit-disabled");
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
    // activate button to autorize submit (update propriety type buttom => submit)
    btnSubmit.setAttribute("type", "submit");
  }
}

// EventListen if form completed, upgrade btn to submit, send data, and display ::after div modal

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  btnSubmit.value = "Fermer";
  btnSubmit.setAttribute("type", "button");
  btnSubmit.removeAttribute("onmouseover");
  btnSubmit.addEventListener("click", closeModal);
  document.documentElement.style.setProperty("--modal-after-display", "flex");
  const dataJsonAPI = Object.fromEntries(controlForm);
  // only to test or remplace by fetch API code
  console.log(dataJsonAPI);
});
