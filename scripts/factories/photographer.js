class PhotographerFactory {
  constructor(dataPhotographer) {
    this.photograph = new Photograph(dataPhotographer);
    this.dataPhotographer = dataPhotographer;
  }

  get getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute(
      'aria-label',
      `Présentation du photographe ${this.photograph.name}`,
    );
    // part IMG
    const link = document.createElement('a');
    link.setAttribute('href', `photographer.html?id=${this.photograph.id}`);
    link.setAttribute(
      'title',
      `Accéder à la page du photographe : ${this.photograph.name}`,
    );
    const img = document.createElement('img');
    img.setAttribute('src', this.photograph.srcPortrat);
    img.setAttribute('aria-label', `Portrait du Photographe ${this.photograph.name}`);
    img.setAttribute('loading', 'lazy');
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.appendChild(img);
    link.appendChild(imgContainer);
    // title h2
    const h2 = document.createElement('h2');
    h2.textContent = this.photograph.name;
    link.appendChild(h2);
    article.appendChild(link);
    // part details
    const city = document.createElement('p');
    city.innerText = `${this.photograph.city}, ${this.photograph.country}`;
    city.classList.add('photographer-city');
    city.setAttribute(
      'aria-label',
      `Ville et Pays du Photographe ${this.photograph.name}`,
    );
    const tagline = document.createElement('p');
    tagline.innerText = `${this.photograph.tagline}`;
    tagline.classList.add('photographer-tagline');
    tagline.setAttribute('aria-label', `Slogan du Photographe ${this.photograph.name}`);
    const price = document.createElement('p');
    price.innerText = `${this.photograph.price}€/jour`;
    price.classList.add('photographer-price');
    price.setAttribute('aria-label', `Prix du Photographe ${this.photograph.name}`);
    article.appendChild(city);
    article.appendChild(tagline);
    article.appendChild(price);
    return article;
  }

  get getUserHeaderDOM() {
    document.title = `Fisheye - Photographe ${this.photograph.name}`;
    // part Details
    const divDetail = document.getElementsByClassName(
      'photograph__header-details',
    )[0];
    const h1 = document.createElement('h1');
    h1.setAttribute('aria-label', 'Identité du Photographe');
    h1.innerText = `${this.photograph.name}`;
    divDetail.appendChild(h1);
    const city = document.createElement('p');
    city.innerText = `${this.photograph.city}, ${this.photograph.country}`;
    city.setAttribute(
      'aria-label',
      `Ville et Pays du Photographe ${this.photograph.name}`,
    );
    city.classList.add('photographer-details-city');
    city.style.fontSize = '24px';
    divDetail.appendChild(city);
    const tagline = document.createElement('p');
    tagline.innerText = `${this.photograph.tagline}`;
    tagline.classList.add('photographer-details-tagline');
    tagline.setAttribute(
      'aria-label',
      `Slogan du Photographe ${this.photograph.name}`,
    );
    divDetail.appendChild(tagline);
    // part IMG
    const divImg = document.getElementsByClassName('photograph__header-img')[0];
    const img = document.createElement('img');
    img.setAttribute('src', this.photograph.srcPortrat);
    img.setAttribute(
      'title',
      `Photo Portrait du Photographe ${this.photograph.name}`,
    );
    img.setAttribute('loading', 'lazy');
    img.setAttribute('alt', `Photo de ${this.photograph.name}`);
    divImg.appendChild(img);
    // part Name Into Modal
    const h2Name = document.createElement('h2');
    h2Name.setAttribute('aria-label', 'Identité du Photographe');
    h2Name.innerText = `${this.photograph.name}`;
    document
      .getElementsByClassName('formData namePhotographer')[0]
      .appendChild(h2Name);
    document.getElementById('idPhotographer').value = this.photograph.id;
    document.getElementById('namePhotographer').value = this.photograph.name;
    return true;
  }
}
