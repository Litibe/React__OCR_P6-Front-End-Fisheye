function photographerFactory(data, index) {
  const picture = `assets/photographers/${data.portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute(
      "aria-label",
      `Présentation du photographe ${data.name}`
    );
    //part IMG
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${data.id}`);
    link.setAttribute(
      "title",
      `Accéder à la page du photographe : ${data.name}`
    );
    link.setAttribute("tabindex", 200 + index);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("title", `Portrait du Photographe ${data.name}`);
    img.setAttribute("aria-label", `Portrait du Photographe ${data.name}`);
    const h2 = document.createElement("h2");
    h2.textContent = data.name;
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    //part details
    const city = document.createElement("p");
    city.innerText = `${data.city}, ${data.country}`;
    city.classList.add("photographer-city");
    city.setAttribute(
      "aria-label",
      `Ville et Pays du Photographe ${data.name}`
    );
    const tagline = document.createElement("p");
    tagline.innerText = `${data.tagline}`;
    tagline.classList.add("photographer-tagline");
    tagline.setAttribute("aria-label", `Slogan du Photographe ${data.name}`);
    const price = document.createElement("p");
    price.innerText = `${data.price}€/jour`;
    price.classList.add("photographer-price");
    price.setAttribute("aria-label", `Prix du Photographe ${data.name}`);
    article.appendChild(city);
    article.appendChild(tagline);
    article.appendChild(price);
    return article;
  }
  return { getUserCardDOM };
}
