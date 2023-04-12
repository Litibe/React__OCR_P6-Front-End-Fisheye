async function getDataApi() {
    try {
        const response = await fetch('./data/photographers.json');
        return response.json();
    } catch {
    // if not data, error page loaded
        return undefined;
    }
}

const displayData = (dataReceived) => {
    const photographersSection = document.querySelector('.photographer_section');
    if (dataReceived === undefined) {
        const errorTitle = document.createElement('h2');
        errorTitle.innerText = 'Aucun Photographe à afficher';
        photographersSection.appendChild(errorTitle);
    } else {
        dataReceived.photographers.forEach((dataPhotographer) => {
            const photographer = new PhotographerFactory(dataPhotographer);
            const userCardDOM = photographer.getUserCardDOM;
            photographersSection.appendChild(userCardDOM);
        });
    }
};

async function init() {
    const dataReceived = await getDataApi();
    displayData(dataReceived);
}

init();
