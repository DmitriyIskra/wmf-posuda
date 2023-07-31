export default class RedrawAsideFilter {
    constructor( filter ) {
        this.filter = filter;

        // для открытия подэлементов
        // актуальный главный чекбокс
        this.activeMainBox = null;
        // актуальный дочерний лист
        this.activeSubList = null;
        // список элементов активного листа
        this.activeSubItems = null;
        // общая высота списка элементов
        this.amountHeight = null;

        // актуальный тайтл пункта фильтра
        this.activeSubTitle = null;
        // актуальный чекбокс пункта фильтра
        this.activeSubCheckboks = null;

        this.lastHover = null;

        this.lastItemHover = null;
        this.lastItemHoverBox = null;
    }

    // Открываем элемент фильтра
    redrawMainItem(target) {
        
        // если элемента для открытия нет то останавливаем работу
        if(!target.nextElementSibling) {
            return;
        }

        // Забираем актуальный бокс, список для открытия 
        // и потомков списка, если таковые имеются
        this.activeMainBox = target.children[1];
        this.activeSubList = target.nextElementSibling;
        // собираем свежий список под элементов
        // которые нужно показать
        this.activeSubItems = this.activeSubList.children;


        // если бокс активен закрываем sub element и меняем стрелку
        if(this.activeMainBox.matches('.filter__main-item-box_active')) {
            this.activeSubList.style.height = '0px';

            // по окончании анимации перерисовываем бокс
            this.activeSubList.addEventListener('transitionend', e => {
                this.activeMainBox.classList.remove('filter__main-item-box_active');
            },{once: true})
            
            return;
        }


        // если элемент не активен и есть потомки
        // значит его можно открыть
        if( this.activeSubList.children.length > 0 ) {
            // вычисляем общую высоту элементов которые нужно показать
            this.amountHeight = [...this.activeSubItems].reduce( (acc, item) => {
                acc += item.offsetHeight;
                return acc;
            }, 0)

            this.activeSubList.style.height = `${this.amountHeight}px`;

            // по окончании анимации перерисовываем бокс
            this.activeSubList.addEventListener('transitionend', e => {
                // меняем вид главного бокса
                this.activeMainBox.classList.add('filter__main-item-box_active');
            },{once: true})
        }
    }


    // выделяем чекбокс
    redrawSubItem(target) {
        this.activeSubTitle = target.children[0];
        this.activeSubCheckboks = target.children[1];

        this.activeSubCheckboks.classList.toggle('filter__sub-item-box_active');

        // if(this.activeSubCheckboks.matches('filter__sub-item-box_active')) {
        //     this.activeSubTitle.classList.remove('filter__sub-item-title_active');
        // }
        
    }

    addDecorationTitle(target) {
        
        const currentBox = target.children[1];
        const currentTitle = target.children[0];
        

        if(!this.lastHover) {
            currentTitle.classList.add('filter__sub-item-title_active');
            this.lastItemHover = currentTitle;
            this.lastItemHoverBox = currentBox
            this.lastHover = target;

            return;
        }

        if(this.lastHover || this.lastHover !== target) {
            if(!this.lastItemHoverBox.matches('.filter__sub-item-box_active')) {
                this.lastItemHover.classList.remove('filter__sub-item-title_active');
            }
            
            currentTitle.classList.add('filter__sub-item-title_active');
            this.lastItemHover = currentTitle;
            this.lastItemHoverBox = currentBox;
            this.lastHover = target;
        }
    }

    removeDecorationTitle(relatedTarget) {
        const currentTitle = relatedTarget.children[0];
        const currentBox = relatedTarget.children[1];

        if(currentBox.matches('.filter__sub-item-box_active')) {
            return;
        }

        currentTitle.classList.remove('filter__sub-item-title_active');

    }
}