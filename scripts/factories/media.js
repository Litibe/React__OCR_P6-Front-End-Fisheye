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
        const divContent = document.getElementsByClassName(
            'photograph__content-list',
        )[0];
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
                    `Photo ${element.title} du Photographe ${this.photograph.name}`,
                );
                img.setAttribute('alt', element.title);
                const imgContainer = document.createElement('div');
                imgContainer.setAttribute('onclick', 'openPhoto(this)');
                imgContainer.setAttribute('tabindex', '5');
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
                    `video ${element.title} du Photographe ${this.photograph.name}`,
                );
                video.setAttribute('alt', element.title);
                const videoContainer = document.createElement('div');
                videoContainer.setAttribute('onclick', 'openPhoto(this)');
                videoContainer.classList.add('img-container');
                videoContainer.appendChild(video);
                videoContainer.setAttribute('tabindex', '5');
                article.appendChild(videoContainer);
            }

            // title
            const divTitle = document.createElement('div');
            divTitle.classList.add('article__div-title');
            const titleImg = document.createElement('h2');
            titleImg.classList.add('article__img-title');
            titleImg.innerText = element.title;
            titleImg.setAttribute('tabindex', '5');
            divTitle.appendChild(titleImg);
            const divLikes = document.createElement('div');
            divLikes.classList.add('article__img-likes');
            const nberLikes = document.createElement('span');
            nberLikes.innerText = element.likes;
            nberLikes.setAttribute('tabindex', '5');
            nberLikes.setAttribute('aria-label', 'Nomnbre de Likes sur le Media');
            const iconLike = document.createElement('span');
            iconLike.innerHTML = '<i class="fa-solid fa-heart addLike"></i>';
            iconLike.setAttribute('tabindex', '5');
            iconLike.setAttribute('aria-label', 'Icône Coeur, cliquer pour Aimer le Media et ajouter un like');

            const integrationNewLike = (divImgLikes) => {
                const titleLike = divImgLikes.parentElement.children[0].innerText;
                const nberLike = divImgLikes.children[0].innerText;
                const totalLikes = document.getElementsByClassName('totalLikes')[0];
                if (!this.addLikes.has(titleLike)) {
                    this.addLikes.set(titleLike, true);
                    divImgLikes.children[0].innerText = (
                        parseInt(nberLike, 10) + 1);
                    totalLikes.innerText = parseInt(totalLikes.innerText, 10) + 1; // innertext
                }
            };

            iconLike.addEventListener('click', (e) => {
                const divImgLikes = e.target.parentElement.parentElement;
                integrationNewLike(divImgLikes);
            });
            iconLike.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const divImgLikes = e.target.parentElement;
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
        const iconLike = document.createElement('span');
        iconLike.innerHTML = '<i class="fa-solid fa-heart " aria-label="likes"></i>';
        divNberLikes.appendChild(nberLikes);
        divNberLikes.appendChild(iconLike);
        divLikes.appendChild(divNberLikes);
        const paidDay = document.createElement('p');
        paidDay.innerHTML = `${this.photograph.price}€ / jour`;
        divLikes.appendChild(paidDay);
        document
            .getElementsByClassName('photograph__content')[0]
            .appendChild(divLikes);
        return true;
    }

    get mediasPhotographerSortedByKey() {
        // search in sort list btn selected (tabindex=2)
        let word = document.querySelector('.dropdown-items button[tabindex="2"]');
        if (word === null) {
            word = document.querySelector('.dropdown-items button').innerText;
        } else {
            word = word.innerText;
        }
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
