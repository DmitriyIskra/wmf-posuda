export default class Http {
    constructor (domain) {
        this.domain = domain;
    }

    async getForm() {
        return await fetch(this.domain);
    }
}