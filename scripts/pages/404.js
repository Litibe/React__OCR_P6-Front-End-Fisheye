function error404() {
  let main = document.getElementById("main");
  main.remove();
  let main404 = document.createElement("main");
  document.title = "Fisheye - Erreur 404";
  let title = document.createElement("h1");
  title.innerHTML = "Erreur 404";
  let content = document.createElement("p");
  content.innerHTML =
    "Merci de cliquer parmi les photographes disponibles en page d'accueil du site ou bien de saisir un ID de photographe valide.";
  main404.appendChild(title);
  main404.appendChild(content);
  document.body.appendChild(main404);
}
