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
  // Init custom Select (found first element into select original to integrate into custom select)
  let initial = document.querySelector(".item-selected span");
  if (initial.innerHTML === "") {
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
      for (element of document.querySelector(".dropdown-items").children) {
        element.classList.remove("d-none");
        console.log("ok");
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
  if (photographerData !== undefined) {
    // display data photographer
    displayData(photographerData);
    // sort Media from select mode sort
    let sortKey = await createSelectSortMediaCustom(photographerData, media);
    // launch initial displayMedia
    displayMedia(photographerData, media, sortKey);
  } else {
    // Launch Error 404 pb Id Photographer unknow
    let main = document.getElementById("main");
    console.log(main);
    main.remove();
    let main404 = document.createElement("main");
    document.title = "Erreur 404";
    let title = document.createElement("h1");
    title.innerHTML = "Erreur 404";
    let content = document.createElement("p");
    content.innerHTML =
      "Merci de cliquer parmi les photographes disponibles en page d'accueil du site ou bien de saisir un ID de photographe valide.";
    main404.appendChild(title);
    main404.appendChild(content);
    document.body.appendChild(main404);
  }
}

init(idPhotographer);
