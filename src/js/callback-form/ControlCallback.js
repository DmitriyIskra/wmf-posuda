export default class ControlCallback {
    constructor(getFormButton, http, redrawCallback) {
        this.buttonGetForm = getFormButton;
        this.redraw = redrawCallback;
        this.http = http;

        this.onClick = this.onClick.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.buttonGetForm.addEventListener('click', this.onClick);
    }

    async onClick() {
        console.log('work');
        const response = await this.http.getForm();
        const result = await response.text();
        console.log(result)
    }
} 