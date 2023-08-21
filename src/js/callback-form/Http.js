export default class Http {
    constructor (domain) {
        this.domain = domain;
    }

    async getForm() {
        const response = await fetch('../modal-form/modal-form.html');
    }
}