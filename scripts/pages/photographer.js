const urlParams = new URLSearchParams(window.location.search);
const idUrl = urlParams.get('id');
let localPhotographerMedia;
const arrayDivBtnSort = Object.values(document.querySelector('.dropdown-items').children);

const getDataApi = async () => {
    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        return data;
    } catch {
        return undefined;
    }
};

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
const openDropDown = () => {
    document.querySelector('.dropdown-items').style.overflow = 'visible';
};
const closeDropDown = (e) => {
    document.querySelector('.dropdown-items').style.overflow = 'hidden';
};

const eraseContent = () => {
    let mediaList = document.querySelector(
        '.photograph__content-list',
    );
    const photographContent = document.querySelector(
        '.photograph__content',
    );
    photographContent.removeChild(mediaList);
    mediaList = document.createElement('div');
    mediaList.classList.add('photograph__content-list');
    photographContent.appendChild(mediaList);
};

const updateSelectSort = async (e) => {
    let elementId;
    arrayDivBtnSort.forEach(
        (element) => {
            if (element.innerText === e.target.innerText) {
                element.setAttribute('id', 'btn-selected');
                elementId = element;
            } else {
                element.removeAttribute('id');
                const newBtn = document.createElement('button');
                const arrayAttributes = Object.values(element.attributes);
                arrayAttributes.forEach(((attr) => {
                    newBtn.innerText = element.innerText;
                    newBtn.setAttribute(attr.name, attr.value);
                }));
                element.remove();
                document.querySelector('.dropdown-items').appendChild(element);
            }
        },
    );
    // if btn clicked by keyboard === last element of list to display btn-selected
    if (elementId !== undefined && e.clientX === 0) {
        elementId.remove();
        document.querySelector('.dropdown-items').appendChild(elementId);
        // document.querySelector('.dropdown-items').lastChild.focus();
    }
    return true;
};

async function init() {
    // extract datas from API
    const { photographers, media } = await getDataApi();
    // extract data only from Id Photographer
    if (photographers === undefined) {
        errorPage();
    }
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
            localPhotographerMedia = photographerMedia;
            let sortMedias = photographerMedia.mediasPhotographerSortedByKey;
            let insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
            const insertTotalLikesToDOM = photographerMedia.insertTotalLikesDOM;
            // addEventListener on click into custom select to update sort Media
            arrayDivBtnSort.forEach(
                (element) => {
                    element.addEventListener('click', async (e) => {
                        const updateBtnSort = await updateSelectSort(e, photographerMedia);
                        eraseContent();
                        if (updateBtnSort === true) {
                            sortMedias = await photographerMedia.mediasPhotographerSortedByKey;
                            insertMediaToDOM = photographerMedia.insertMediaCardToDOM;
                            closeDropDown(e);
                        }
                    });
                    element.addEventListener('mouseover', (e) => {
                        openDropDown(e);
                    });
                    element.addEventListener('focus', (e) => {
                        openDropDown(e);
                    });
                    element.addEventListener('mouseout', (e) => {
                        closeDropDown(e);
                    });
                    element.addEventListener('blur', (e) => closeDropDown(e));
                },
            );
        }
    }
}

init();
