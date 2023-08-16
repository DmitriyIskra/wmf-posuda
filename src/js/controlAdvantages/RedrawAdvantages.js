export default class RedrawAdvantages {
    constructor(control, carrentActiveControl, underlineList, cards) {
        this.control = control;
        this.cards = cards;
        this.underlineList = underlineList;

        this.currentActiveControl = carrentActiveControl;
        this.currentUnderline = this.underlineList[0];
        this.currentActiveCard = this.cards[0];       
    }

    redraw(element) {
        const mark = element.dataset.type;

        // снимаем  активность с текущих элементов
        this.currentActiveControl.classList.remove('advantages__control_active');
        this.currentUnderline.classList.remove('advantages__underline_active');
        this.currentActiveCard.classList.remove('advantages__content_active');

        // сохраняем текущие активные элементы
        this.currentActiveControl = element;
        this.currentUnderline = element.children[1];
        this.currentActiveCard = this.cards[mark];

        // назначаем активным элементам класс активности
        this.currentActiveControl.classList.add('advantages__control_active');
        this.currentUnderline.classList.add('advantages__underline_active');
        this.currentActiveCard.classList.add('advantages__content_active');    
    }
}