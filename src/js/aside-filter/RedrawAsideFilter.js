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
    }

    // !!! Подчеркивание добавляется и удаляется всегда не по клику а по наведению
    // если чекбокс не быбран, по клику отмечается чекбокс и подчеркивание тогда остается
    addDecorationTitle(target) {
        // получаем актуальные чекбокс и тайтл
        const currentBox = target.children[1];
        const currentTitle = target.children[0];
        
        // если this.lastHover пуст значит наведение происходит впервые 
        if(!this.lastHover) {
            currentTitle.classList.add('filter__sub-item-title_active');
            this.lastItemHover = currentTitle;
            this.lastItemHoverBox = currentBox
            this.lastHover = target;

            return;
        }

        // наведение происходит не впервые и элемент отличается от последнего
        if(this.lastHover || this.lastHover !== target) {
            // если в наведенном элементе не выбран чекбокс можно ему добавить подчеркивание
            if(!this.lastItemHoverBox.matches('.filter__sub-item-box_active')) {
                this.lastItemHover.classList.remove('filter__sub-item-title_active');
            }
            
            currentTitle.classList.add('filter__sub-item-title_active');
            this.lastItemHover = currentTitle;
            this.lastItemHoverBox = currentBox;
            this.lastHover = target;
        }
    }

    // так как на мобильных нет mouseover, то и подчеркивание по наведению как на 
    // desctop не работает, нужно подчеркивать по касанию
    redrawUnderLineForToch(el) {
        console.log('work')
        const title = el.children[0];

        title.classList.toggle('filter__sub-item-title_active');

    }

    // удаляем подчеркивание при уходе с фильтра или элемента
    removeDecorationTitle() {
        if(this.lastItemHoverBox  && this.lastItemHoverBox.matches('.filter__sub-item-box_active')) {
            return;
        }
 
        if(this.lastItemHover) {
            this.lastItemHover.classList.remove('filter__sub-item-title_active');
            this.lastItemHoverBox = null;
            this.lastHover = null;
            this.lastItemHover = null;
        }
    }
}