function mediaPhotographerFactory(photographerData, media, keySort) {
  const photographerName = photographerData.name
    .split(" ")[0]
    .replace("-", "_");

  let mediasPhotographer = new Array();
  let totalLikes = 0;
  // extract only media of photographer
  media.forEach(
    (element) =>
      element.photographerId === photographerData.id &&
      (mediasPhotographer.push(element), (totalLikes += element.likes))
  );
  // sort media photographer
  mediasPhotographer.sort(function (a, b) {
    if (a[keySort] < b[keySort]) return -1;
    if (a[keySort] > b[keySort]) return 1;
    return 0;
  });

  function getMediaCardDOM() {
    const divContent = document.getElementsByClassName(
      "photograph__content-list"
    )[0];

    mediasPhotographer.forEach((element) => {
      const article = document.createElement("article");
      //img
      if (element.image !== undefined) {
        const pictureSrc = `assets/images/${photographerName}/${element.image}`;
        const img = document.createElement("img");
        img.classList.add("article__img");
        img.setAttribute("src", pictureSrc);
        img.setAttribute(
          "aria-label",
          `Photo ${element.title} du Photographe ${photographerData.name}`
        );
        img.setAttribute("alt", element.title);
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("onclick", "openPhoto(this)");
        imgContainer.appendChild(img);
        article.appendChild(imgContainer);
      } else if (element.video !== undefined) {
        const pictureSrc = `assets/images/${photographerName}/${element.video}`;
        const video = document.createElement("video");
        video.classList.add("article__video");
        video.setAttribute("src", pictureSrc);
        video.setAttribute("type", `video/${element.video.split(".")[1]}`);
        video.setAttribute(
          "aria-label",
          `video ${element.title} du Photographe ${photographerData.name}`
        );
        video.setAttribute(
          "alt",
          `video ${element.title} de ${photographerData.name}`
        );
        const videoContainer = document.createElement("div");
        videoContainer.setAttribute("onclick", "openPhoto(this)");
        videoContainer.classList.add("img-container");
        videoContainer.appendChild(video);
        article.appendChild(videoContainer);
      }

      // title
      const divTitle = document.createElement("div");
      divTitle.classList.add("article__div-title");
      const titleImg = document.createElement("h2");
      titleImg.classList.add("article__img-title");
      titleImg.innerText = `${element.title}`;
      divTitle.appendChild(titleImg);
      const nberLikes = document.createElement("span");
      nberLikes.innerHTML = `${element.likes} <i class="fa-solid fa-heart" aria-label="likes"></i>`;
      divTitle.appendChild(nberLikes);
      article.appendChild(divTitle);

      divContent.appendChild(article);
    });
    // all likes
    const divLikes = document.createElement("div");
    divLikes.classList.add("total__likes-paid");
    const nberLikes = document.createElement("p");
    nberLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart" aria-label="likes" aria-hidden=true></i>`;
    divLikes.appendChild(nberLikes);
    const paidDay = document.createElement("p");
    paidDay.innerHTML = `${photographerData.price}€ / jour`;
    divLikes.appendChild(paidDay);

    document
      .getElementsByClassName("photograph__content")[0]
      .appendChild(divLikes);
  }
  return { getMediaCardDOM };
}
