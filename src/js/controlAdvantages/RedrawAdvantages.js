export default class RedrawAdvantages {
    constructor(control, currentActiveElements, contents) {
        this.control = control;

        this.knives = contents.knives;
        this.balancing = contents.balancing;
        this.individuality = contents.individuality

        this.currentActiveControl = currentActiveElements.control;
        this.currentUnderline = currentActiveElements.control.children[1];
        this.currentActiveContent = currentActiveElements.content;       
    }

    redraw(element) {
        const mark = element.dataset.type;

        // снимаем  активность с текущих элементов
        this.currentActiveControl.classList.remove('about-tablewares__control_active');
        this.currentUnderline.classList.remove('about-tablewares__underline_active');
        this.currentActiveContent.classList.remove('about-tablewares__content_active');

        // сохраняем текущие активные элементы
        this.currentActiveControl = element;
        this.currentUnderline = element.children[1];
        this.currentActiveContent = this[mark];

        // назначаем активным элементам класс активности
        this.currentActiveControl.classList.add('about-tablewares__control_active');
        this.currentUnderline.classList.add('about-tablewares__underline_active');
        this.currentActiveContent.classList.add('about-tablewares__content_active');    
    }
}