export default class ControlCallback {
    constructor(getFormButton, http, redrawCallback, validation, IMask) {
        this.buttonGetForm = getFormButton;
        this.redraw = redrawCallback;
        this.http = http;
        this.validation = validation;
        this.Imask = IMask;

        this.modal = null;
        this.form = null;
        this.phone = null;
        this.email = null;
        this.modalUrl = null;

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
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
        this.phone.addEventListener('blur', this.onBlur);
        this.email.addEventListener('blur', this.onBlur);
        this.phone.addEventListener('focus', this.onFocus);
        this.email.addEventListener('focus', this.onFocus);
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
            this.phone = this.redraw.phone;
            this.email = this.redraw.email;
            this.modalUrl = this.redraw.modalUrl;

            // регистрируем слушатели событий на форме
            this.registerEvents();

            const mask = new this.Imask(this.phone, {
                mask: '+{7}(000)000-00-00',
            })

            return;
        }

        if(e.target.matches('.modal__close') || e.target.matches('.modal-wrapper')) {
            this.redraw.closeModal();
        }

        if(e.target.matches('.main__button-feedback')) {
            this.redraw.openModal();
        }
        
    }

    async onSubmit(e) {
        e.preventDefault();

        const phone = this.phone.value;
        const email = this.email.value;

        // если поля пустые будут проставлены классы invalid
        if(!phone) {
            this.redraw.invalid(this.phone.closest('.modal__wr-form-item'));
        }   
        
        if(!email) {
            this.redraw.invalid(this.email.closest('.modal__wr-form-item')); 
        } 

        // собираем значения на проверку присутствия невалидности
        const validPhone = this.phone.matches('.modal__form-element_invalid');
        const validEmail = this.email.matches('.modal__form-element_invalid');
        // забираем url на котором была форма
        this.modalUrl.value = window.location.href;

        // если одно из значений true значит не отправляем данные
        // так как одно из значений не валидно
        if(validPhone || validEmail) return;

        const formData = new FormData(this.form);

        console.log(Array.from(formData)); 
    }


    // при фокусе все свойства невалидности сбрасываем, чтоб не раздражать
    // красным цветом
    onFocus(e) {
        console.log('focus2')
        if(e.target.matches('.modal__form-element_invalid')) {
            this.redraw.resetInvalid(e.target.closest('.modal__wr-form-item'));
        }
    }

    // при потере фокуса элемент валидируется
    onBlur(e) {
        if(!e.target.value) return;

        const result = this.validation.check(e.target, e.target.value);
        
        if(!result) {
            this.redraw.invalid(e.target.closest('.modal__wr-form-item')); 
        }

        console.log('blur')
    }
} 