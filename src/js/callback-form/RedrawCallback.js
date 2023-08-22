export default class RedrawCallback {
    constructor() {
        this.modalWrapper = null;

        this.modal = null;
        
        this.form = null;
        this.phone = null;
        this.email = null;

        this.counterInputNum = null;
    }

    renderModal(text) {
        // убираем лишнее из строки кода
        const modalHtml = text.replace(/^<head>.*<\/head>/g, '');
        // получаем высоту страницы для обертки модалки
        const pageHeight = document.body.offsetHeight;
        // активируем парсер DOM
        const parser = new DOMParser();

        // создаем обертку и даем ей необходимые правила и классы
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal-wrapper');
        modalWrapper.style = `height: ${pageHeight}px;`;

        // из строки кода получаем html DOM
        const result = parser.parseFromString(modalHtml, 'text/html');

        const modal = result.querySelector('.modal');
        modal.style = `top: ${scrollY}px;`
        
        modalWrapper.append(modal);

        document.body.append(modalWrapper);

        this.modalWrapper = document.querySelector('.modal-wrapper');
        this.modal = this.modalWrapper.querySelector('.modal');
        this.form = this.modalWrapper.querySelector('.modal__form');
        this.wrPhone = this.form.querySelector('.modal__wr-form-item_phone');
        this.phone = this.form.phone;
        this.wrEmail = this.form.querySelector('.modal__wr-form-item_email');
        this.email = this.form.email;
    }

    openModal() {
        // получаем высоту страницы для обертки модалки
        const pageHeight = document.body.offsetHeight;

        this.modalWrapper.style = `height: ${pageHeight}px;`;
        this.modal.style = `top: ${scrollY}px;`
        this.modalWrapper.classList.remove('modal-wrapper_unactive');
    }

    closeModal() {
        this.form.reset();

        // если у элемента обозначающего не корректный ввод
        // сбрасываем все что касается невалидности
        if(this.wrPhone.children[1].matches('.modal__label_active')) {
            this.resetInvalid(this.wrPhone);
        }

        if(this.wrEmail.children[1].matches('.modal__label_active')) {
            this.resetInvalid(this.wrEmail);
        }

        // забираем класс активности у модалки
        this.modalWrapper.classList.add('modal-wrapper_unactive');
    }

    // задаем invalid ответственным элементам
    invalid(element) {
        element.children[0].classList.remove('modal__label_active');
        element.children[1].classList.add('modal__label_active');
        element.children[2].classList.add('modal__form-element_invalid');
    }

    // убираем invalid ответственным элементам
    resetInvalid (element) {
        element.children[0].classList.add('modal__label_active');
        element.children[1].classList.remove('modal__label_active');
        element.children[2].classList.remove('modal__form-element_invalid');
    }

    maskPhone() {

    }
}