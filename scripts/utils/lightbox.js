const updatePhotoIntoLightbox = (media) => {
    const container = document.querySelector(
        '.lightbox-loading-container',
    );
    container.setAttribute('tabindex', '-1');
    // delete ancious media support
    if (container.children[1] !== undefined) {
        container.children[1].remove();
    }
    const titleMediaBox = document.querySelector(
        '.lightbox-details figure figcaption',
    );

    if (media.firstChild.localName === 'video') {
        mediaBox = document.createElement('video');
        mediaBox.setAttribute('controls', 'true');
    } else if (media.firstChild.localName === 'img') {
        mediaBox = document.createElement('img');
    }
    const arrayAttributes = Object.values(media.firstChild.attributes);
    arrayAttributes.forEach(((attr) => {
        if (attr.name !== 'class') { mediaBox.setAttribute(attr.name, attr.value); }
    }));
    const originalSrc = (mediaBox.getAttribute('src')).replace('thumbnail/', '');
    mediaBox.setAttribute('src', originalSrc);
    mediaBox.setAttribute('aria-label', `Media ${media.firstChild.getAttribute('alt')} ouvert en plein-écran`);
    mediaBox.setAttribute('tabindex', '0');
    container.appendChild(mediaBox);
    mediaBox.focus();
    titleMediaBox.innerHTML = media.firstChild.getAttribute('aria-label').replace('Photo ', '');
};

const nextPhoto = () => {
    const container = document.querySelector(
        '.lightbox-loading-container',
    );
    const mediaBox = container.children[1];
    const listChild = document.querySelector('.photograph__content-list')
        .children;
    const arrayChrildren = Object.values(listChild);
    // search if name_file into DOM to search next media else first of array
    arrayChrildren.forEach((children) => {
        if (
            children.innerHTML.includes(mediaBox.getAttribute('src').split('/')[3]) === true
        && children.nextElementSibling !== null
        ) {
            updatePhotoIntoLightbox(children.nextElementSibling.firstChild);
        } else if (
            children.innerHTML.includes(mediaBox.getAttribute('src').split('/')[3]) === true
        ) {
            updatePhotoIntoLightbox(arrayChrildren[0].firstChild);
        }
    });
};

const previousPhoto = () => {
    const container = document.querySelector(
        '.lightbox-loading-container',
    );
    const mediaBox = container.children[1];
    const listChild = document.querySelector('.photograph__content-list')
        .children;
    const arrayChrildren = Object.values(listChild);
    // search if name_file into DOM to search previous media else last of array
    arrayChrildren.forEach((children) => {
        if (
            children.innerHTML.includes(mediaBox.getAttribute('src').split('/')[3]) === true
                && children.previousElementSibling !== null
        ) {
            updatePhotoIntoLightbox(children.previousElementSibling.firstChild);
        } else if (
            children.innerHTML.includes(mediaBox.getAttribute('src').split('/')[3]) === true
        ) {
            updatePhotoIntoLightbox(arrayChrildren[arrayChrildren.length - 1].firstChild);
        }
    });
};

const closeLightbox = () => {
    document.getElementById('lightbox_modal').style.display = 'none';
    document.querySelector('header').setAttribute('aria-hidden', 'false');
    document.querySelector('header').style = 'filter: blur(0px)';
    document.querySelector('main').setAttribute('aria-hidden', 'false');
    document.querySelector('main').style = 'filter: blur(0px)';
    // enable tabindex into DOM
    const allTabIndexHeader = document.querySelectorAll("[tabindex='-1']");
    allTabIndexHeader.forEach((item) => item.setAttribute('tabindex', '0'));
};

const navigationKey = (event) => {
    if (event.key === 'ArrowLeft') {
        previousPhoto();
    } else if (event.key === 'ArrowRight') {
        nextPhoto();
    } else if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'Enter') {
        if (event.srcElement.lastChild.className === 'fa-solid fa-chevron-left') {
            previousPhoto();
        } else if (event.srcElement.lastChild.className === 'fa-solid fa-chevron-right') {
            nextPhoto();
        }
    }
};

const displayLightbox = () => {
    document.getElementById('lightbox_modal').style.display = 'flex';
    document.querySelector('header').setAttribute('aria-hidden', 'true');
    document.querySelector('header').style = 'filter: blur(2px)';
    document.querySelector('main').setAttribute('aria-hidden', 'true');
    document.querySelector('main').style = 'filter: blur(2px)';
    document.addEventListener('keydown', (e) => navigationKey(e));
    // disable tabindex into DOM
    const allTabIndexHeader = document.querySelectorAll("[tabindex='0']");
    allTabIndexHeader.forEach((item) => item.setAttribute('tabindex', '-1'));
};

const openPhoto = (divPhoto) => {
    displayLightbox();
    updatePhotoIntoLightbox(divPhoto);
    document
        .querySelector('.fa-chevron-right')
        .addEventListener(
            'click',
            (e) => nextPhoto(),
        );
    document
        .querySelector('.fa-chevron-left')
        .addEventListener(
            'click',
            (e) => previousPhoto(),
        );
};
