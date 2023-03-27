function displayLightbox() {
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "none";
}

function updatePhotoIntoLightbox(photo) {
  const imgBox = document.getElementsByClassName("lightbox-img")[0];
  const titleImgBox = document.querySelector(
    ".lightbox-details figure figcaption"
  );
  imgBox.setAttribute("src", photo.firstChild.getAttribute("src"));
  titleImgBox.innerHTML = photo.firstChild.getAttribute("alt");

  // detect photo
  contentList = document.getElementsByClassName("photograph__content-list")[0]
    .children;
  console.log(contentList);
}

function openPhoto(e) {
  displayLightbox();
  updatePhotoIntoLightbox(e);
}
