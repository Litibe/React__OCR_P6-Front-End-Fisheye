const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("id");

async function getDataApi() {
  try {
    let response = await fetch("./data/photographers.json");
    const data = response.json();
    return data;
  } catch {
    return undefined;
  }
}

async function displayData(photographerData) {
  const photographerModel = photographerFactory(photographerData);
  photographerModel.getUserCardDOM();
}

async function displayMedia(photographerData, media, sortKey) {
  const mediaModel = mediaPhotographerFactory(photographerData, media, sortKey);
  mediaModel.getMediaCardDOM();
}

async function extractDataOnlyForPhotographer(photographers, idPhotographer) {
  let photographerData = new Array();
  photographers.map(
    (data) => data.id == idPhotographer && photographerData.push(data)
  );
  return photographerData[0];
}

async function convertWordtoSortKey(word) {
  if (word === "Popularité") {
    return "likes";
  } else if (word === "Date") {
    return "date";
  } else if (word === "Titre") {
    return "title";
  }
}

async function updateSelectSort(e) {
  for (element of document.querySelector(".dropdown-items").children) {
    element.classList.remove("d-none");
  }
  // edit element display custom select (first element)
  document.getElementsByClassName("item-selected")[0].innerText =
    e.target.innerText;
  //edit keyword to edit sort list media
  for (element of document.getElementsByClassName("item-sort")) {
    if (element.innerHTML === e.target.innerHTML) {
      element.classList.add("d-none");
      sortKey = await convertWordtoSortKey(e.target.innerHTML);
    }
  }
}

async function eraseContent() {
  let mediaList = document.getElementsByClassName(
    "photograph__content-list"
  )[0];
  let photographContent = document.getElementsByClassName(
    "photograph__content"
  )[0];
  photographContent.removeChild(mediaList);
  mediaList = document.createElement("div");
  mediaList.classList.add("photograph__content-list");
  photographContent.appendChild(mediaList);
}

async function createSelectSortMediaCustom(photographerData, media) {
  // Init custom Select (found first element into select original to integrate into custom select)
  let initial = document.getElementsByClassName("item-selected")[0];
  if (initial.innerText === "") {
    initial.innerHTML =
      document.getElementsByClassName("item-sort")[0].innerHTML;
    sortKey = await convertWordtoSortKey(initial.innerHTML);
  }
  // addEventListener on click into custom select to update sort Media
  for (children of document.getElementsByClassName("item-sort")) {
    //if children === item_selection display none
    if (children.innerHTML == initial.innerHTML) {
      children.classList.add("d-none");
    }
    // addEventListener
    children.addEventListener("click", async function (e) {
      await updateSelectSort(e);
      await eraseContent();
      await displayMedia(photographerData, media, sortKey);
    });
  }
  return sortKey;
}

async function init(idPhotographer) {
  //extract datas from API
  const { photographers, media } = await getDataApi();
  // extract data only from Id Photographer
  let photographerData = await extractDataOnlyForPhotographer(
    photographers,
    idPhotographer
  );
  if (photographerData !== undefined) {
    // display data photographer
    displayData(photographerData);
    // sort Media from select mode sort
    let sortKey = await createSelectSortMediaCustom(photographerData, media);
    // launch initial displayMedia
    displayMedia(photographerData, media, sortKey);
  } else {
    // Launch Error 404 pb Id Photographer unknow
    error404();
  }
}

init(idPhotographer);
