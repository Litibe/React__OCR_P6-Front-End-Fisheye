function photographerFactory(photographerData) {
  const picture = `assets/photographers/${photographerData.portrait}`;

  function getUserCardDOM() {
    //part Details
    const divDetail = document.getElementsByClassName(
      "photograph__header-details"
    )[0];
    const h1 = document.createElement("h1");
    h1.setAttribute("aria-label", `Identité du Photographe`);
    h1.innerText = `${photographerData.name}`;
    divDetail.appendChild(h1);
    const city = document.createElement("p");
    city.innerText = `${photographerData.city}, ${photographerData.country}`;
    city.setAttribute(
      "aria-label",
      `Ville et Pays du Photographe ${photographerData.name}`
    );
    city.classList.add("photographer-details-city");
    city.style.fontSize = "24px";
    divDetail.appendChild(city);
    const tagline = document.createElement("p");
    tagline.innerText = `${photographerData.tagline}`;
    tagline.classList.add("photographer-details-tagline");
    tagline.setAttribute(
      "aria-label",
      `Slogan du Photographe ${photographerData.name}`
    );
    divDetail.appendChild(tagline);
    //part IMG
    const divImg = document.getElementsByClassName("photograph__header-img")[0];
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute(
      "title",
      `Photo Portrait du Photographe ${photographerData.name}`
    );
    img.setAttribute("alt", `Photo de ${photographerData.name}`);
    divImg.appendChild(img);
    //part Name Into Modal
    const h2Name = document.createElement("h2");
    h2Name.setAttribute("aria-label", `Identité du Photographe`);
    h2Name.innerText = `${photographerData.name}`;
    document
      .getElementsByClassName("formData namePhotographer")[0]
      .appendChild(h2Name);
  }
  return { getUserCardDOM };
}
