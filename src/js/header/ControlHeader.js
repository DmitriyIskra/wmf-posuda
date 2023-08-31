export default class ControlHeader {
    constructor(draw) {
        this.draw = draw; 

        this.onClick = this.onClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    init() {
        this.registerEvents(); 

        // собираем массив элементов короткого подчеркивания
        this.draw.arrShortLine = [...this.draw.header.querySelectorAll('.header__short-line')];

        // собираем массивчик подменюшек
        this.draw.arrSubMenu = [...this.draw.header.querySelectorAll('.wr-sub-menu')];
        
    }

    registerEvents() {

        this.draw.header.addEventListener('click', this.onClick);
        this.draw.header.addEventListener('mouseover', this.onMouseOver);
        this.draw.header.addEventListener('mouseout', this.onMouseOut);

        
    }

    onClick(e) {
        // Заглушка чтоб ничего не происходило, на элементы у которых нет подменю
        if(e.target.dataset.name === 'serve' || e.target.dataset.name === 'contacts') {
            return;
        }

        // открытие под меню по клику на элемент меню
        if(e.target.matches('.header__nav-link')) {
            this.draw.openSubMenu(e.target.closest('.header__nav-item'));
        }

        // Закрытие подменю по нажатию на крестик
        if(e.target.closest('.close-submenu')) {
            this.draw.closeSubMenu();
        }

        // РАБОТА КНОПКИ ПОИСК СТАРТ
        if(e.target.matches('.header__icon-search')) {
            // активируем строку поиска и перерисовываем лупу
            this.draw.redrawIconSearch(e.target);
            this.draw.redrawPlaceSearch();
        }
 
        // РАБОТА КНОПКИ ПОИСК ФИНИШ


        // РАБОТА МОБИЛЬНОГО МЕНЮ
        if(e.target.closest('.header__icon-mobile-nav')) {
            this.draw.openMobileMenu();
        }

        if(e.target.matches('.upper-item-menu')) {
            this.draw.controlUnderItemsMenu(e.target, e.target.nextElementSibling); 
        }
    }

    onMouseOver(e) {
        // При наведении накладываем маску на элемент меню
        if(e.target.closest('.header__nav-link') && !e.target.parentElement.matches('.active')) { 
            let element = e.target.closest('.header__nav-item');
            let mask = element.querySelector('.link-mask');

            this.draw.addMask(element, mask);
        }
    }

    onMouseOut(e) {
        if(e.target.closest('.header__nav-link')) { 
            this.draw.removeMask();
        }
    }
}