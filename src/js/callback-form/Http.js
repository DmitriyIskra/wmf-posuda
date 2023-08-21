export default class Http {
    constructor (domain) {
        this.domain = domain;
    }

    // async getForm() {
    //     const response = await fetch('../../modal-formmodal-form.html', {
    //         headers: {
    //             Accept: 'text/html',
    //         },
    //     });
    //     return response;
    // }

    async getForm() {
        return await fetch(this.domain)
            // .then(response => response.text())
            // .then(html => {
            //   console.log('loaded html', html);
            // })
    }
}