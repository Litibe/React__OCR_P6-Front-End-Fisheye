const updatePhotoIntoLightbox = (media) => {
    const container = document.querySelector(
        '.lightbox-loading-container',
    );
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
        return true;
    }));
    const originalSrc = (mediaBox.getAttribute('src')).replace('thumbnail/', '');
    mediaBox.setAttribute('src', originalSrc);
    container.appendChild(mediaBox);
    titleMediaBox.innerHTML = media.firstChild.getAttribute('alt');

    // Search if previous and next article exist
    if (media.parentElement.previousElementSibling === null) {
        // document.querySelector('.fa-chevron-left').style.display = 'none';
    } else {
        // document.querySelector('.fa-chevron-left').style.display = 'block';
    }
    if (media.parentElement.nextElementSibling === null) {
        // document.querySelector('.fa-chevron-right').style.display = 'none';
    } else {
        // document.querySelector('.fa-chevron-right').style.display = 'block';
    }
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
    document.querySelector('header').style.display = 'block';
    document.querySelector('main').style.display = 'block';
};

const navigationKey = (event) => {
    if (event.key === 'ArrowLeft') {
        previousPhoto();
    } else if (event.key === 'ArrowRight') {
        nextPhoto();
    } else if (event.key === 'Escape') {
        closeLightbox();
    }
};

const displayLightbox = () => {
    document.getElementById('lightbox_modal').style.display = 'flex';
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.addEventListener('keydown', (e) => navigationKey(e));
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
