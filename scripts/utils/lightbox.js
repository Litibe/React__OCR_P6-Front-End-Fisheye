function displayLightbox() {
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "none";
}

async function updatePhotoIntoLightbox(photo) {
  const imgBox = document.getElementsByClassName("lightbox-img")[0];
  const titleImgBox = document.querySelector(
    ".lightbox-details figure figcaption"
  );
  imgBox.removeAttribute("src");
  imgBox.setAttribute("src", photo.firstChild.getAttribute("src"));
  titleImgBox.innerHTML = photo.firstChild.getAttribute("alt");

  // Search if previous and next article exist
  if (photo.parentElement.previousElementSibling === null) {
    document.getElementsByClassName("fa-chevron-left")[0].style.display =
      "none";
  } else {
    document.getElementsByClassName("fa-chevron-left")[0].style.display =
      "block";
  }
  if (photo.parentElement.nextElementSibling === null) {
    document.getElementsByClassName("fa-chevron-right")[0].style.display =
      "none";
  } else {
    document.getElementsByClassName("fa-chevron-right")[0].style.display =
      "block";
  }
}

function openPhoto(divPhoto) {
  displayLightbox();
  updatePhotoIntoLightbox(divPhoto);
  document
    .getElementsByClassName("fa-chevron-right")[0]
    .addEventListener("click", function (e) {
      nextPhoto(divPhoto);
    });
  document
    .getElementsByClassName("fa-chevron-left")[0]
    .addEventListener("click", function (e) {
      previousPhoto(divPhoto);
    });
}

async function nextPhoto() {
  const imgBox = document.getElementsByClassName("lightbox-img")[0];
  let listChild = document.getElementsByClassName("photograph__content-list")[0]
    .children;
  for (children of listChild) {
    if (children.innerHTML.includes(imgBox.getAttribute("src")) === true) {
      await updatePhotoIntoLightbox(children.nextElementSibling.firstChild);
      break;
    }
  }
}

async function previousPhoto() {
  const imgBox = document.getElementsByClassName("lightbox-img")[0];
  let listChild = document.getElementsByClassName("photograph__content-list")[0]
    .children;
  for (children of listChild) {
    if (children.innerHTML.includes(imgBox.getAttribute("src")) === true) {
      await updatePhotoIntoLightbox(children.previousElementSibling.firstChild);
      break;
    }
  }
}
