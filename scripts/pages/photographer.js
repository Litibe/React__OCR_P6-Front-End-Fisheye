const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("id");

async function getDataApi() {
  try {
    let response = await fetch("../../data/photographers.json");
    const data = response.json();
    return data;
  } catch {
    return undefined;
  }
}

async function displayData(photographerData, media) {
  const photographerModel = photographerFactory(photographerData);
  photographerModel.getUserCardDOM();
  const mediaModel = mediaPhotographerFactory(photographerData, media);
  mediaModel.getPhotoCardDOM();
}

async function init(idPhotographer) {
  const { photographers, media } = await getDataApi();
  photographers.map(
    (photographerData) =>
      photographerData.id == idPhotographer &&
      displayData(photographerData, media)
  );
}

init(idPhotographer);
