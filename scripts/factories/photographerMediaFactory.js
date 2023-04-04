class PhotographerMediaFactory {
  constructor(photographer, idPhotographer, mediasPhotographer) {
    this.photograph = photographer.photograph;
    this.idPhotographer = idPhotographer;
    this.mediasPhotographer = mediasPhotographer;
    this.sortKey = undefined;
  }

  get insertMediaCardToDOM() {
    const divContent = document.getElementsByClassName(
      'photograph__content-list',
    )[0];

    this.mediasPhotographer.forEach((element) => {
      const article = document.createElement('article');
      // img
      if (element.image !== undefined) {
        const pictureSrc = `assets/images/${this.photograph.folderMediaName}/${element.image}`;
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
        imgContainer.appendChild(img);
        imgContainer.classList.add('img-container');
        article.appendChild(imgContainer);
      } else if (element.video !== undefined) {
        const pictureSrc = `assets/images/${this.photograph.folderMediaName}/${element.video}`;
        const video = document.createElement('video');
        video.classList.add('article__video');
        video.setAttribute('src', pictureSrc);
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
        article.appendChild(videoContainer);
      }

      // title
      const divTitle = document.createElement('div');
      divTitle.classList.add('article__div-title');
      const titleImg = document.createElement('h2');
      titleImg.classList.add('article__img-title');
      titleImg.innerText = `${element.title}`;
      divTitle.appendChild(titleImg);
      const nberLikes = document.createElement('span');
      nberLikes.innerHTML = `${element.likes} <i class="fa-solid fa-heart" aria-label="likes"></i>`;
      divTitle.appendChild(nberLikes);
      article.appendChild(divTitle);
      divContent.appendChild(article);
    });

    return true;
  }

  get totalLikes() {
    const initialValue = 0;
    const total = this.mediasPhotographer.reduce(
      (accumulator, element) => accumulator + element.likes,
      initialValue,
    );
    return total;
  }

  get insertTotalLikesDOM() {
    // all likes
    const divLikes = document.createElement('div');
    divLikes.classList.add('total__likes-paid');
    const nberLikes = document.createElement('p');
    nberLikes.innerHTML = `${this.totalLikes} <i class="fa-solid fa-heart" aria-label="likes" aria-hidden=true></i>`;
    divLikes.appendChild(nberLikes);
    const paidDay = document.createElement('p');
    paidDay.innerHTML = `${this.photograph.price}€ / jour`;
    divLikes.appendChild(paidDay);
    document
      .getElementsByClassName('photograph__content')[0]
      .appendChild(divLikes);
    return true;
  }

  get mediasPhotographerSortedByKey() {
    if (document.getElementsByClassName('item-selected')[0].innerText === '') {
      document.getElementsByClassName('item-selected')[0].innerText = document.getElementsByClassName('item-sort')[0].innerHTML;
    }
    const word = document.getElementsByClassName('item-selected')[0].innerText;
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