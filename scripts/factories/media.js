class MediaFactory {
    constructor(photographer, idPhotographer, mediasPhotographer) {
        this.photograph = photographer.photograph;
        this.idPhotographer = idPhotographer;
        this.mediasPhotographer = mediasPhotographer;
        this.sortKey = undefined;
        this.totalLikes = 0;
        this.addLikes = new Map();
    }

    get insertMediaCardToDOM() {
        const divContent = document.querySelector(
            '.photograph__content-list',
        );
        this.mediasPhotographer.forEach((element) => {
            const article = document.createElement('article');
            // img
            if (element.image !== undefined) {
                const pictureSrc = `assets/images/${this.photograph.folderMediaName}/thumbnail/${element.image}`;
                const img = document.createElement('img');
                img.classList.add('article__img');
                img.setAttribute('src', pictureSrc);
                img.setAttribute(
                    'aria-label',
                    `Photo ${element.title}`,
                );
                img.setAttribute('alt', '');
                const imgContainer = document.createElement('div');
                imgContainer.setAttribute('onclick', 'openPhoto(this)');
                imgContainer.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        openPhoto(e.target);
                    }
                });
                imgContainer.setAttribute('tabindex', '0');
                imgContainer.appendChild(img);
                imgContainer.classList.add('img-container');
                article.appendChild(imgContainer);
            } else if (element.video !== undefined) {
                const videoSrc = `assets/images/${this.photograph.folderMediaName}/${element.video}`;
                const video = document.createElement('video');
                video.classList.add('article__video');
                video.setAttribute('src', videoSrc);
                video.setAttribute('type', `video/${element.video.split('.')[1]}`);
                video.setAttribute(
                    'aria-label',
                    `video ${element.title}`,
                );
                video.setAttribute('alt', element.title);
                const videoContainer = document.createElement('div');
                videoContainer.setAttribute('onclick', 'openPhoto(this)');
                videoContainer.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        openPhoto(e.target);
                    }
                });
                videoContainer.classList.add('img-container');
                videoContainer.appendChild(video);
                videoContainer.setAttribute('tabindex', '0');
                article.appendChild(videoContainer);
            }

            // title
            const divTitle = document.createElement('div');
            divTitle.classList.add('article__div-title');
            const titleImg = document.createElement('h2');
            titleImg.classList.add('article__img-title');
            titleImg.innerText = element.title;
            titleImg.setAttribute('tabindex', '0');
            divTitle.appendChild(titleImg);
            const divLikes = document.createElement('div');
            divLikes.classList.add('article__img-likes');
            const nberLikes = document.createElement('span');
            nberLikes.innerText = element.likes;
            nberLikes.setAttribute('tabindex', '0');
            nberLikes.setAttribute('aria-label', `Nombre de Likes sur le Media : ${element.likes}`);
            const iconLike = document.createElement('button');
            iconLike.innerHTML = '<strong class="fa-solid fa-heart addLike"></strong>';
            iconLike.setAttribute('tabindex', '0');
            iconLike.setAttribute('aria-label', 'Icône Coeur, cliquer ou touche entrer pour ajouter un like sur le Media');

            const integrationNewLike = (divImgLikes) => {
                const titleLike = divImgLikes.parentElement.children[0].innerText;
                const nberLike = divImgLikes.children[0].innerText;
                const totalLikes = document.querySelector('.totalLikes');
                if (!this.addLikes.has(titleLike)) {
                    this.addLikes.set(titleLike, true);
                    divImgLikes.children[0].innerText = (
                        parseInt(nberLike, 10) + 1);
                    // update aria label after add likes
                    nberLikes.setAttribute('aria-label', `Nombre de Likes sur le Media : ${parseInt(nberLike, 10) + 1}`);
                    totalLikes.innerText = parseInt(totalLikes.innerText, 10) + 1; // innertext
                    totalLikes.setAttribute('aria-label', `Nombre Total de Likes : ${parseInt(totalLikes.innerText, 10) + 1}`);
                    iconLike.setAttribute('aria-label', 'Icône Coeur, Vous avez  ajouté un like sur le Media');
                }
            };

            iconLike.addEventListener('click', (e) => {
                if (e.pageX === 0) {
                    const divImgLikes = e.target.parentElement.parentElement.lastChild;
                    integrationNewLike(divImgLikes);
                } else {
                    const divImgLikes = e.target.parentElement.parentElement;
                    integrationNewLike(divImgLikes);
                }
            });

            divLikes.appendChild(nberLikes);
            divLikes.appendChild(iconLike);
            divTitle.appendChild(divLikes);
            article.appendChild(divTitle);
            divContent.appendChild(article);
        });
        return true;
    }

    get insertTotalLikesDOM() {
        const initialValue = 0;
        const total = this.mediasPhotographer.reduce(
            (accumulator, element) => accumulator + element.likes,
            initialValue,
        ); this.totalLikes = total;
        // all likes
        const divLikes = document.createElement('div');
        divLikes.classList.add('total__likes-paid');
        const divNberLikes = document.createElement('div');
        const nberLikes = document.createElement('span');
        nberLikes.innerText = this.totalLikes;
        nberLikes.classList.add('totalLikes');
        nberLikes.setAttribute('aria-label', `Nombre total de likes pour l'artiste : ${this.totalLikes}`);
        nberLikes.setAttribute('tabindex', '0');
        const iconLike = document.createElement('span');
        iconLike.innerHTML = '<strong class="fa-solid fa-heart " aria-label="Icône likes"></strong>';
        divNberLikes.appendChild(nberLikes);
        divNberLikes.appendChild(iconLike);
        divLikes.appendChild(divNberLikes);
        const paidDay = document.createElement('p');
        paidDay.innerText = `${this.photograph.price}€ / jour`;
        paidDay.setAttribute('aria-label', `Prix facturé par jour pour cet(te) artiste : ${this.photograph.price} €`);
        paidDay.setAttribute('tabindex', '0');
        divLikes.appendChild(paidDay);
        document
            .querySelector('.photograph__content')
            .appendChild(divLikes);
        return true;
    }

    get mediasPhotographerSortedByKey() {
        // search in sort list btn selected
        const word = document.getElementById('btn-selected').innerText;
        if (word === 'Popularité') {
            this.sortKey = 'likes';
        } if (word === 'Date') {
            this.sortKey = 'date';
        } if (word === 'Titre') {
            this.sortKey = 'title';
        }
        this.mediasPhotographer.sort((a, b) => {
            if (a[this.sortKey] < b[this.sortKey]) return -1;
            if (a[this.sortKey] > b[this.sortKey]) return 1;
            return 0;
        });
        return this.mediasPhotographer;
    }
}
