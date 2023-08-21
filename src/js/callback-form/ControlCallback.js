export default class ControlCallback {
    constructor(getFormButton, http, redrawCallback) {
        this.buttonGetForm = getFormButton;
        this.redraw = redrawCallback;
        this.http = http;

        this.modal = null;
        this.form = null;

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        // если формы на странице еще нет то собыие только на кнопку
        if(!this.modal) {
            this.buttonGetForm.addEventListener('click', this.onClick);

            return;
        }

        this.modal.addEventListener('click', this.onClick);
        this.form.addEventListener('submit', this.onSubmit);
    }

    async onClick(e) {
        // если формы еще нет на странице то загружаем
        // и даем ей слушатели событий (для первого срабатывания)
        if(!this.modal) {
            // получаем код
            const response = await this.http.getForm();
            const html = await response.text();

            // отправлем полученный код в отрисовку
            this.redraw.renderModal(html);

            // сохраняем элементы после отрисовки
            this.modal = this.redraw.modalWrapper;
            this.form = this.redraw.form;

            // регистрируем слушатели событий на форме
            this.registerEvents();

            return;
        }

        if(e.target.matches('.modal__close')) {
            this.redraw.closeModal();
        }

        if(e.target.matches('.main__button-feedback')) {
            this.redraw.openModal();
        }
        
    }

    onSubmit(e) {
        e.preventDefault();
    }
} 