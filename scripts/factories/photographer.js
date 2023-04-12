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
        img.setAttribute('alt', `Photographe ${this.photograph.name}`);
        img.setAttribute('loading', 'lazy');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        img.setAttribute('tabindex', '1');
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
        city.setAttribute('tabindex', '1');
        const tagline = document.createElement('p');
        tagline.innerText = `${this.photograph.tagline}`;
        tagline.classList.add('photographer-tagline');
        tagline.setAttribute('aria-label', `Slogan du Photographe ${this.photograph.name}`);
        tagline.setAttribute('tabindex', '1');
        const price = document.createElement('p');
        price.innerText = `${this.photograph.price}€/jour`;
        price.classList.add('photographer-price');
        price.setAttribute('aria-label', `Prix du Photographe ${this.photograph.name}`);
        price.setAttribute('tabindex', '1');
        article.appendChild(city);
        article.appendChild(tagline);
        article.appendChild(price);
        return article;
    }

    get getUserHeaderDOM() {
        document.title = `Fisheye - Photographe ${this.photograph.name}`;
        // part Details
        const divDetail = document.querySelector(
            '.photograph__header-details',
        );
        const h1 = document.createElement('h1');
        h1.setAttribute('aria-label', `Identité du Photographe : ${this.photograph.name}`);
        h1.innerText = this.photograph.name;
        h1.setAttribute('tabindex', '1');
        divDetail.appendChild(h1);
        const city = document.createElement('p');
        city.innerText = `${this.photograph.city}, ${this.photograph.country}`;
        city.setAttribute(
            'aria-label',
            `Ville et Pays du Photographe ${this.photograph.name} : ${this.photograph.city}, ${this.photograph.country} `,
        );
        city.classList.add('photographer-details-city');
        city.setAttribute('tabindex', '1');
        divDetail.appendChild(city);
        const tagline = document.createElement('p');
        tagline.innerText = this.photograph.tagline;
        tagline.classList.add('photographer-details-tagline');
        tagline.setAttribute(
            'aria-label',
            `Slogan du Photographe ${this.photograph.name} : ${this.photograph.tagline}`,
        );
        tagline.setAttribute('tabindex', '1');
        divDetail.appendChild(tagline);
        // part IMG
        const divImg = document.querySelector('.photograph__header-img');
        const img = document.createElement('img');
        img.setAttribute('src', this.photograph.srcPortrat);
        img.setAttribute(
            'title',
            `Photo Portrait du Photographe ${this.photograph.name}`,
        );
        img.setAttribute('tabindex', '1');
        img.setAttribute('loading', 'lazy');
        img.setAttribute('alt', `Photo  du Photographe ${this.photograph.name}`);
        divImg.appendChild(img);
        // part Name Into Modal
        const h2Name = document.createElement('h2');
        h2Name.setAttribute('aria-label', `Identité du Photographe : ${this.photograph.name}`);
        h2Name.innerText = this.photograph.name;
        h2Name.setAttribute('tabindex', '1');
        document
            .getElementsByClassName('formData namePhotographer')[0]
            .appendChild(h2Name);
        document.getElementById('idPhotographer').value = this.photograph.id;
        document.getElementById('namePhotographer').value = this.photograph.name;
        return true;
    }
}
