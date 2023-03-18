function photographerFactory(data) {
  const picture = `assets/photographers/${data.portrait}`;

  function getUserCardDOM() {
    //part Details
    const divDetail = document.getElementsByClassName(
      "photograph-header-details"
    )[0];
    const h1 = document.createElement("h1");
    h1.setAttribute("aria-label", `Identité du Photographe`);
    h1.innerText = `${data.name}`;
    divDetail.appendChild(h1);
    const city = document.createElement("p");
    city.innerText = `${data.city}`;
    city.setAttribute("aria-label", `Ville du Photographe ${data.name}`);
    city.classList.add("photographer-city");
    divDetail.appendChild(city);
    const tagline = document.createElement("p");
    tagline.innerText = `${data.tagline}`;
    tagline.classList.add("photographer-tagline");
    tagline.setAttribute("aria-label", `Slogan du Photographe ${data.name}`);
    divDetail.appendChild(tagline);
    //part IMG
    const divImg = document.getElementsByClassName("photograph-header-img")[0];
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("title", `Photo Portrait du Photographe ${data.name}`);
    img.setAttribute("alt", `Photo de ${data.name}`);
    divImg.appendChild(img);
  }
  return { getUserCardDOM };
}
