function mediaPhotographerFactory(photographerData, media) {
  const photographerName = photographerData.name
    .split(" ")[0]
    .replace("-", "_");
  console.log("test", photographerName);

  let pictures = new Array();
  let totalLikes = 0;
  media.forEach(
    (element) =>
      element.photographerId === photographerData.id &&
      (pictures.push(element), (totalLikes += element.likes))
  );
  console.log(pictures);
  function getPhotoCardDOM() {
    const divContent = document.getElementsByClassName(
      "photograph-content-list"
    )[0];

    pictures.forEach((element, index) => {
      console.log(index, element);
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
        img.setAttribute(
          "alt",
          `Photo ${element.title} de ${photographerData.name}`
        );
        article.appendChild(img);
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
        article.appendChild(video);
      }

      // title
      const divTitle = document.createElement("div");
      divTitle.classList.add("article__div-title");
      const titleImg = document.createElement("p");
      titleImg.classList.add("article__img-title");
      titleImg.innerText = `${element.title}`;
      divTitle.appendChild(titleImg);
      const nberLikes = document.createElement("span");
      nberLikes.innerHTML = `${element.likes} <i class="fa-solid fa-heart"></i>`;
      divTitle.appendChild(nberLikes);
      article.appendChild(divTitle);

      divContent.appendChild(article);
    });
    // all likes
    const divLikes = document.createElement("div");
    divLikes.classList.add("total__likes");
    const nberLikes = document.createElement("p");
    nberLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    divLikes.appendChild(nberLikes);
    divContent.appendChild(divLikes);
  }
  return { getPhotoCardDOM };
}
