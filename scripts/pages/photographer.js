const urlParams = new URLSearchParams(window.location.search);
const idUrl = urlParams.get('id');

async function getDataApi() {
    try {
        const response = await fetch('./data/photographers.json');
        const data = response.json();
        return data;
    } catch {
        return undefined;
    }
}

const errorPage = () => {
    const divMain = document.getElementById('main');
    divMain.remove();
    photographersSection = document.createElement('div');
    const errorTitle = document.createElement('h2');
    errorTitle.innerText = "Merci de cliquer parmi les photographes disponibles en page d'accueil du site ou bien de saisir un ID de photographe valide.";
    photographersSection.appendChild(errorTitle);
    document.title = 'Fisheye - Erreur 404';
    document.body.appendChild(photographersSection);
};

const updateSelectSort = (e) => {
    const arrayDivBtnSort = Object.values(document.querySelector('.dropdown-items').children);
    // set btn clicked on first in list
    let tabIndexNber = 3;
    let orderNber = 1;
    arrayDivBtnSort.forEach(
        (element) => {
            if (element.innerText === e.target.innerText) {
                element.style.order = '1';
                element.setAttribute('tabindex', '2');
            } else {
                element.style.order = orderNber.toString();
                element.setAttribute('tabindex', tabIndexNber.toString());
                element.style.order = tabIndexNber.toString();
                tabIndexNber += 1;
                orderNber += 1;
            }
        },
    );
};

const eraseContent = () => {
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
};

const openDropDown = document.querySelector('.dropdown-items');
const closeDropDown = () => {
    openDropDown.style.overflow = 'hidden';
};

async function init() {
    // extract datas from API
    const { photographers, media } = await getDataApi();
    // extract data only from Id Photographer
    const dataPhotographer = [];
    const mediasPhotographer = [];
    photographers.map(
        (data) => data.id === parseInt(idUrl, 10) && dataPhotographer.push(data),
    );
    media.map(
        (data) => data.photographerId === parseInt(idUrl, 10) && mediasPhotographer.push(data),
    );
    if (dataPhotographer.length === 0) {
        errorPage();
    } else {
        const photographer = new PhotographerFactory(dataPhotographer[0]);
        const insertCardIntoDom = photographer.getUserHeaderDOM;
        if (insertCardIntoDom) {
            const photographerMedia = new MediaFactory(
                photographer,
                idUrl,
                mediasPhotographer,
            );
            let sortMedias = photographerMedia.mediasPhotographerSortedByKey;
            let insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
            const insertTotalLikesToDOM = photographerMedia.insertTotalLikesDOM;
            // addEventListener on click into custom select to update sort Media
            const arrayDivBtnSort = Object.values(document.getElementsByClassName('item-sort'));

            arrayDivBtnSort.forEach(
                (element) => {
                    element.addEventListener('click', async (e) => {
                        openDropDown.style.overflow = 'visible';
                        updateSelectSort(e);
                        eraseContent();
                        sortMedias = await photographerMedia.mediasPhotographerSortedByKey;
                        insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
                        setTimeout(closeDropDown, 200);
                    });
                    element.addEventListener('mouseover', () => {
                        openDropDown.style.overflow = 'visible';
                    });
                    element.addEventListener('focus', () => {
                        openDropDown.style.overflow = 'visible';
                    });
                    element.addEventListener('mouseout', () => {
                        closeDropDown();
                    });
                    element.addEventListener('blur', () => {
                        closeDropDown();
                    });
                },
            );
        }
    }
}

init();
