const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get('id');

async function getDataApi() {
  try {
    const response = await fetch('./data/photographers.json');
    const data = response.json();
    return data;
  } catch {
    return undefined;
  }
}

function errorPage() {
  const divMain = document.getElementById('main');
  divMain.remove();
  photographersSection = document.createElement('div');
  const errorTitle = document.createElement('h2');
  errorTitle.innerText = "Merci de cliquer parmi les photographes disponibles en page d'accueil du site ou bien de saisir un ID de photographe valide.";
  photographersSection.appendChild(errorTitle);
  document.title = 'Fisheye - Erreur 404';
  document.body.appendChild(photographersSection);
}

function updateSelectSort(e) {
  const arrayDivBtnSort = Object.values(document.querySelector('.dropdown-items').children);
  arrayDivBtnSort.forEach(
    (element) => {
      element.classList.remove('d-none');
      // edit element display custom select (first element)
      document.getElementsByClassName('item-selected')[0].innerText = e.target.innerText;
      // edit keyword to edit sort list media
      const arrayBtnSort = Object.values(document.getElementsByClassName('item-sort'));
      arrayBtnSort.forEach((divButton) => {
        if (divButton.innerHTML === e.target.innerHTML) {
          divButton.classList.add('d-none');
        }
      });
    },
  );
}

async function displayMedia(photographerData, media, sortKey) {
  const mediaModel = mediaPhotographerFactory(photographerData, media, sortKey);
  mediaModel.getMediaCardDOM();
}

async function eraseContent() {
  let mediaList = document.getElementsByClassName(
    'photograph__content-list',
  )[0];
  const photographContent = document.getElementsByClassName(
    'photograph__content',
  )[0];
  photographContent.removeChild(mediaList);
  mediaList = document.createElement('div');
  mediaList.classList.add('photograph__content-list');
  photographContent.appendChild(mediaList);
}

async function init() {
  // extract datas from API
  const { photographers, media } = await getDataApi();
  // extract data only from Id Photographer
  const dataPhotographer = [];
  const mediasPhotographer = [];
  photographers.map(
    (data) => data.id === parseInt(idPhotographer, 10) && dataPhotographer.push(data),
  );
  media.map(
    (data) => data.photographerId === parseInt(idPhotographer, 10) && mediasPhotographer.push(data),
  );
  if (dataPhotographer.length === 0) {
    errorPage();
  } else {
    const photographer = new PhotographerFactory(dataPhotographer[0]);
    const insertCardIntoDom = photographer.getUserHeaderDOM;
    if (insertCardIntoDom) {
      const photographerMedia = new PhotographerMediaFactory(
        photographer,
        idPhotographer,
        mediasPhotographer,
      );
      let sortMediasPhotographer = photographerMedia.mediasPhotographerSortedByKey;
      let insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
      const insertTotalLikesToDOM = photographerMedia.insertTotalLikesDOM;
      // addEventListener on click into custom select to update sort Media
      const arrayDivBtnSort = Object.values(document.getElementsByClassName('item-sort'));
      arrayDivBtnSort.forEach(
        (element) => {
          if (element.innerHTML === document.getElementsByClassName('item-selected')[0].innerHTML) {
            element.classList.add('d-none');
          }
          element.addEventListener('click', async (e) => {
            await updateSelectSort(e);
            await eraseContent();
            sortMediasPhotographer = await photographerMedia.mediasPhotographerSortedByKey;
            insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
          });
        },
      );
    }
  }
}

init();
