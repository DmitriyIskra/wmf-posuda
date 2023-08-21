export default class RedrawCallback {
    constructor() {
        this.modalWrapper = null;
        this.modal = null;
        this.form = null;
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
    }

    openModal() {
        // получаем высоту страницы для обертки модалки
        const pageHeight = document.body.offsetHeight;

        this.modalWrapper.style = `height: ${pageHeight}px;`;
        this.modal.style = `top: ${scrollY}px;`
        this.modalWrapper.classList.remove('modal-wrapper_unactive');
    }

    closeModal() {
        this.modalWrapper.classList.add('modal-wrapper_unactive');
    }
}