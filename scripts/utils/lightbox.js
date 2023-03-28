function displayLightbox() {
  document.getElementById("lightbox_modal").style.display = "flex";
  document.querySelector("header").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.addEventListener("keydown", (e) => navigationKey(e));
}

function closeLightbox() {
  document.getElementById("lightbox_modal").style.display = "none";
  document.querySelector("header").style.display = "block";
  document.querySelector("main").style.display = "block";
  document.removeEventListener("keydown", (e) => navigationKey(e));
}

async function updatePhotoIntoLightbox(media) {
  const container = document.getElementsByClassName(
    "lightbox-loading-container"
  )[0];
  // delete ancious media support
  if (container.children[1] !== undefined) {
    container.children[1].remove();
  }
  const titleMediaBox = document.querySelector(
    ".lightbox-details figure figcaption"
  );

  if (media.firstChild.localName === "video") {
    mediaBox = document.createElement("video");
    mediaBox.setAttribute("controls", "true");
  } else if (media.firstChild.localName === "img") {
    mediaBox = document.createElement("img");
  }
  for (const attr of media.firstChild.attributes) {
    attr.name !== "class" && mediaBox.setAttribute(attr.name, attr.value);
  }
  container.appendChild(mediaBox);
  titleMediaBox.innerHTML = media.firstChild.getAttribute("alt");

  // Search if previous and next article exist
  if (media.parentElement.previousElementSibling === null) {
    document.getElementsByClassName("fa-chevron-left")[0].style.display =
      "none";
  } else {
    document.getElementsByClassName("fa-chevron-left")[0].style.display =
      "block";
  }
  if (media.parentElement.nextElementSibling === null) {
    document.getElementsByClassName("fa-chevron-right")[0].style.display =
      "none";
  } else {
    document.getElementsByClassName("fa-chevron-right")[0].style.display =
      "block";
  }
}

function navigationKey(event) {
  if (event.key === "ArrowLeft") {
    previousPhoto();
  } else if (event.key === "ArrowRight") {
    nextPhoto();
  } else if (event.key === "Escape") {
    closeLightbox();
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
  const container = document.getElementsByClassName(
    "lightbox-loading-container"
  )[0];
  const mediaBox = container.children[1];
  let listChild = document.getElementsByClassName("photograph__content-list")[0]
    .children;
  for (children of listChild) {
    if (
      children.innerHTML.includes(mediaBox.getAttribute("src")) === true &&
      children.nextElementSibling !== null
    ) {
      await updatePhotoIntoLightbox(children.nextElementSibling.firstChild);
      break;
    }
  }
}

async function previousPhoto() {
  const container = document.getElementsByClassName(
    "lightbox-loading-container"
  )[0];
  const mediaBox = container.children[1];
  let listChild = document.getElementsByClassName("photograph__content-list")[0]
    .children;
  for (children of listChild) {
    if (
      children.innerHTML.includes(mediaBox.getAttribute("src")) === true &&
      children.previousElementSibling !== null
    ) {
      await updatePhotoIntoLightbox(children.previousElementSibling.firstChild);
      break;
    }
  }
}
