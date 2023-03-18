const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("id");
console.log(idPhotographer);

async function getDataApi() {
  try {
    let response = await fetch("../../data/photographers.json");
    const data = response.json();
    return data;
  } catch {
    return undefined;
  }
}

async function displayData(element) {
  const photographerModel = photographerFactory(element);
  photographerModel.getUserCardDOM();
}

async function init(idPhotographer) {
  const { photographers, media } = await getDataApi();
  photographers.map(
    (element) => element.id == idPhotographer && displayData(element)
  );
}

init(idPhotographer);
