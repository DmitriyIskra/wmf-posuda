export default class RedrawCallback {
    constructor() {
        this.modalWrapper = null;

        this.modalWrapper = null;
        this.modal = null;
        
        this.form = null;
        this.wrPhone = null;
        this.phone = null;
        this.wrEmail = null;
        this.email = null;
        this.modalUrl = null;
    }

    renderModal(text) {
        // убираем лишнее из строки кода
        const modalHtml = text.replace(/^<head>.*<\/head>/g, '');
        // получаем высоту страницы для обертки модалки
        const pageHeight = document.body.offsetHeight;
        // получаем ширину для позиционирования модалки по верху
        const pageWidth = document.body.offsetWidth;
        // активируем парсер DOM
        const parser = new DOMParser();

        // создаем обертку и даем ей необходимые правила и классы
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal-wrapper');
        modalWrapper.style = `height: ${pageHeight}px;`;

        // из строки кода получаем html DOM
        const result = parser.parseFromString(modalHtml, 'text/html');

        const modal = result.querySelector('.modal');
        // если страница по ширине больше 961 даем top для десктопа
        // что то ттипа медиазапроса в css
        if(pageWidth > 961) {
            modal.style = `top: ${scrollY + (innerHeight * 5.5 / 100)}px;`;
        } else {
            modal.style = `top: ${scrollY}px;`;
        }
        
        modalWrapper.append(modal);

        document.body.append(modalWrapper);

        this.modalWrapper = document.querySelector('.modal-wrapper');
        // сохраняем так, так как нужно получить ссылку на элемент именно в DOM
        this.modal = this.modalWrapper.querySelector('.modal');
        this.form = this.modalWrapper.querySelector('.modal__form');
        this.wrPhone = this.form.querySelector('.modal__wr-form-item_phone');
        this.phone = this.form.phone;
        this.wrEmail = this.form.querySelector('.modal__wr-form-item_email');
        this.email = this.form.email;
        this.modalUrl = this.form.querySelector('.modal__url');
    }

    openModal() {
        // получаем высоту и ширину страницы для обертки модалки
        const pageHeight = document.body.offsetHeight;
        const pageWidth = document.body.offsetWidth;

        this.modalWrapper.style = `height: ${pageHeight}px;`;

        // если страница по ширине больше 961 даем top для десктопа
        // что то ттипа медиазапроса в css
        if(pageWidth > 961) {
            this.modal.style = `top: ${scrollY + (innerHeight * 5.5 / 100)}px;`;
        } else {
            this.modal.style = `top: ${scrollY}px;`;
        }
        
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

        // обнуляем каунтер
        this.counterPhone = 3;
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
}