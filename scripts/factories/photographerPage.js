function photographerFactory(data) {
  const picture = `assets/photographers/${data.portrait}`;

  function getUserCardDOM() {
    //part Details
    const divDetail = document.getElementsByClassName(
      "photograph-header-details"
    )[0];
    const h1 = document.createElement("h1");
    h1.setAttribute("aria-label", `Identité du Photographe`);
    h1.innerText = `${data.name}`;
    divDetail.appendChild(h1);
    const city = document.createElement("p");
    city.innerText = `${data.city}, ${data.country}`;
    city.setAttribute(
      "aria-label",
      `Ville et Pays du Photographe ${data.name}`
    );
    city.classList.add("photographer-details-city");
    city.style.fontSize = "24px";
    divDetail.appendChild(city);
    const tagline = document.createElement("p");
    tagline.innerText = `${data.tagline}`;
    tagline.classList.add("photographer-details-tagline");
    tagline.setAttribute("aria-label", `Slogan du Photographe ${data.name}`);
    divDetail.appendChild(tagline);
    //part IMG
    const divImg = document.getElementsByClassName("photograph-header-img")[0];
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("title", `Photo Portrait du Photographe ${data.name}`);
    img.setAttribute("alt", `Photo de ${data.name}`);
    divImg.appendChild(img);
    //part Name Into Modal
    const h2Name = document.createElement("h2");
    h2Name.setAttribute("aria-label", `Identité du Photographe`);
    h2Name.innerText = `${data.name}`;
    document
      .getElementsByClassName("formData namePhotographer")[0]
      .appendChild(h2Name);
  }
  return { getUserCardDOM };
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
