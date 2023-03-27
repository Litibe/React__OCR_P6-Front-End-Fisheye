async function getDataApi() {
  try {
    let response = await fetch("../data/photographers.json");
    const data = response.json();
    return data;
  } catch {
    return undefined;
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer, index) => {
    const photographerModel = photographerFactory(photographer, index);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers, media } = await getDataApi();
  displayData(photographers);
}

init();
