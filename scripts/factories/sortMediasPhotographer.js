function sortMediasPhotographerFactory(photographerData, media, sortKey) {
  let mediasPhotographer = new Array();
  console.log(sortKey);
  let totalLikes = 0;
  media.forEach(
    (element) =>
      element.photographerId === photographerData.id &&
      (mediasPhotographer.push(element), (totalLikes += element.likes))
  );
  // sort media photographer
  mediasPhotographer.sort(function (a, b) {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return mediasPhotographer, totalLikes;
}
