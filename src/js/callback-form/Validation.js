export default class ValidationForm {
    constructor(regExpPhone, regExpEmail) {
        this.regExpPhone = regExpPhone;
        this.regExpEmail = regExpEmail;
    }

    check(element, value) {
        if(element.matches('#phone')) {
            return this.regExpPhone.test(value);
        }

        if(element.matches('#email')) {
            return this.regExpEmail.test(value);
        }
    }
}