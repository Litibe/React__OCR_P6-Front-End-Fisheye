const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("id");

async function getDataApi() {
  try {
    let response = await fetch("./../data/photographers.json");
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

async function createSelectSortMediaCustom(photographerData, media) {
  const selectSection = document.querySelector(".photograph__content select");
  // Init custom Select (found first element into select original to integrate into custom select)
  let initial = document.querySelector(".item-selected span");
  if (initial.innerHTML === "") {
    initial.innerHTML =
      document.querySelector("select").firstElementChild.value;
    sortKey = await convertWordtoSortKey(initial.innerHTML);
  }
  // Copy all child into select original to integrate into custom select
  for (children of selectSection.children) {
    let div = document.createElement("div");
    div.innerHTML = children.innerHTML;
    document.querySelector(".dropdown-items").appendChild(div);
    if (div.innerHTML == initial.innerHTML) {
      div.classList.add("d-none");
    }
    // addEventListener on click into custom select to update sort Media
    div.addEventListener("click", async function (e) {
      for (element of document.querySelector(".dropdown-items").children) {
        element.classList.remove("d-none");
      }
      // edit element display custom select (first element)
      document.getElementsByClassName("item-selected")[0].innerText =
        e.target.innerText;
      //edit keyword to edit sort list media
      for (element of document.querySelector(".dropdown-items").children) {
        if (element.innerHTML === div.innerHTML) {
          element.classList.add("d-none");
          sortKey = await convertWordtoSortKey(div.innerHTML);
        }
      }
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
      initial.innerHTML =
        document.querySelector("select").firstElementChild.value;
      displayMedia(photographerData, media, sortKey);
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
  // display data photographer
  displayData(photographerData);
  // sort Media from select mode sort
  let sortKey = await createSelectSortMediaCustom(photographerData, media);
  // launch initial displayMedia
  displayMedia(photographerData, media, sortKey);
}

init(idPhotographer);
