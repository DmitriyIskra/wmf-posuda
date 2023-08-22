export default class ControlCallback {
    constructor(getFormButton, http, redrawCallback, validation) {
        this.buttonGetForm = getFormButton;
        this.redraw = redrawCallback;
        this.http = http;
        this.validation = validation;

        this.modal = null;
        this.form = null;
        this.phone = null;
        this.email = null;

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this)
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
        this.phone.addEventListener('input', this.onInput);
        this.email.addEventListener('input', this.onInput);
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

            // регистрируем слушатели событий на форме
            this.registerEvents();

            return;
        }

        if(e.target.matches('.modal__close') || e.target.matches('.modal-wrapper')) {
            this.redraw.closeModal();
        }

        if(e.target.matches('.main__button-feedback')) {
            this.redraw.openModal();
        }
        
    }

    onSubmit(e) {
        e.preventDefault();

        const phone = this.phone.value;
        const email = this.email.value;

        if(!phone) {
            this.redraw.invalid(this.phone.closest('.modal__wr-form-item'));
        }   
        
        if(!email) {
            this.redraw.invalid(this.email.closest('.modal__wr-form-item')); 
        } 

        console.log('submit')
    }

    onInput(e) {
        console.log(e)
        if(e.target.matches('#phone') && parseInt(e.data)) {
            const curentValue = e.target.value;
        }
    }

    // при фокусе все свойства невалидности сбрасываем, чтоб не раздражать
    // красным цветом
    onFocus(e) {
        console.log('focus2')
        if(e.target.matches('.modal__form-element_invalid')) {
            this.redraw.resetInvalid(e.target.closest('.modal__wr-form-item'));
        }

        if(e.target.matches('#phone')) {
            e.preventDefault();
            e.target.value = '+7(__)___ __ __';
            setTimeout(() => {
                this.phone.selectionStart = this.phone.selectionEnd = 3;
            })
            
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