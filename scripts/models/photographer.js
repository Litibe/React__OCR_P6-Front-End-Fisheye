// eslint-disable-next-line no-unused-vars
class Photograph {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    get id() { return this._id; }

    get name() { return this._name; }

    get city() { return this._city; }

    get country() { return this._country; }

    get tagline() { return this._tagline; }

    get price() { return this._price; }

    get portrait() { return this._portrait; }

    get srcPortrat() {
        return `assets/photographers/${this._portrait}`;
    }

    get folderMediaName() {
        const folder = this._name.split(' ')[0]
            .replace('-', '_');
        return (folder);
    }
}
