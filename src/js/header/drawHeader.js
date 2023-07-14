export default class DrawHeader {
    constructor(header) {
        this.header = header;

        this.placeSearch = this.header.querySelector('.header__place-search');
        this.main = document.querySelector('.main');
        this.maskSubMenu = document.querySelector('.mask-sub-menu')
        this.arrSubMenu = null;
        this.arrShortLine = null;
        this.longLine = this.header.querySelector('.header__long-underline');

        this.lastOverElement = null;
        this.lastActiveMask = null;
        this.activeIconSearch = null; 
        this.lastActiveNavElement = null;
        this.lastSubMenu = null;
        this.lastShortLine = null;
    }


    addMask(elem, mask) {
        // При наведении накладываем маску на элемент меню
        this.lastOverElement = elem;
        this.lastActiveMask = mask;

        this.lastActiveMask.classList.add('hover-nav-mask');
    }

    removeMask() { 
        this.lastActiveMask.classList.remove('hover-nav-mask');
    }


    openSubMenu(el) {
        let index = el.dataset.index;

        let heightMain = this.main.offsetHeight

        // открытие подменю, если еще не было открыто
        if(!this.lastSubMenu) {

            // Если при открытии подменю был открыт поиск, он должен закрыться
            if(this.activeIconSearch) {
                // сбрасываем активность иконки поиска и очищаем элемент
                this.activeIconSearch.classList.remove('header__icon-search_active');
                this.activeIconSearch = null;
                
                // у строки ввода удаляем класс активности и сбрасываем форму
                this.placeSearch.classList.remove('place-search_active');
                this.placeSearch.parentElement.reset();
            }


            // сохраняем весь элемент меню по которому был клик
            this.lastActiveNavElement = el;
            // отмечаем его активным
            this.lastActiveNavElement.classList.add('active');

            // сохраняем последний и активный элемент сабменю
            this.lastSubMenu = this.arrSubMenu[index];
            // сохраняем последний и активный элемент короткой строки
            this.lastShortLine = this.arrShortLine[index];
            // убираем длинную линию
            this.longLine.style.opacity = '0';
            // активируем меню
            this.lastSubMenu.classList.remove('unactive-sub');
            // активируем короткую линию, которая служит подчеркиванием
            this.lastShortLine.classList.add('short-line-active');
            // задаем высоту маске подменю для main
            this.maskSubMenu.style.height = `${heightMain}px`; 
            // удаляем маску с активнокого, кликнутого элемента
            this.removeMask();
            
            return;
        }

        // если дошли сюда значит каоке то подменю открыто, берем индекс последнего активного элемента
        let lastIndex = this.lastActiveNavElement.dataset.index;

        // если клик будет по тому же элементу меню что и было в крайний раз
        // просто закрываем подменю
        if(this.lastSubMenu && index === lastIndex) {
            this.closeSubMenu();
        }
        

        // сраюотает если подменю открыто, а клик произошел по элементу меню
        // с другим подменю
        if(this.lastSubMenu && index !== lastIndex) {
            // закрываем неактуальное подменю
            this.closeSubMenu();

            // сохраняем весь элемент меню по которому был клик
            this.lastActiveNavElement = el;
            // отмечаем его активным
            this.lastActiveNavElement.classList.add('active');

            // сохраняем последний и активный элемент сабменю
            this.lastSubMenu = this.arrSubMenu[index];
            // сохраняем последний и активный элемент короткой строки
            this.lastShortLine = this.arrShortLine[index];
            // убираем длинную линию
            this.longLine.style.opacity = '0';
            // активируем меню
            this.lastSubMenu.classList.remove('unactive-sub');
            // активируем короткую линию, которая служит подчеркиванием
            this.lastShortLine.classList.add('short-line-active');
            // задаем высоту маске подменю для main
            this.maskSubMenu.style.height = `${heightMain}px`;
            // удаляем маску с активнокого, кликнутого элемента
            this.removeMask();
        }
    }

    closeSubMenu() {
        // закрываем последнее открытое подменю и возвращаем все элементы на место
        this.lastSubMenu.classList.add('unactive-sub');
        this.lastActiveNavElement.classList.remove('active');
        this.lastShortLine.classList.remove('short-line-active');
        this.longLine.style.opacity = '';
        
        // удаляем все связанное с открытием подменю из памяти 
        this.lastSubMenu = null;
        this.lastActiveNavElement = null;
        this.lastShortLine = null; 
        // Убираем высоту маске подменю для main
        this.maskSubMenu.style.height = ``;
    }


    // Перерисовка иконки поиска
    redrawIconSearch(target) {
        if(target.matches('.header__icon-search_active')) {
            target.classList.remove('header__icon-search_active');
            this.activeIconSearch = null;
            return;
        }

        // если при открытии поиска, подменю открыто, то закроем подменю
        if(this.lastSubMenu) {
            this.closeSubMenu();
        }

        target.classList.add('header__icon-search_active');
        // сохраняем элемент, если не пусто значит активен
        this.activeIconSearch = target;
    }

    // активация поля для ввода поиска
    redrawPlaceSearch() {
        if(this.placeSearch.matches('.place-search_active')) {
            this.placeSearch.classList.remove('place-search_active');
            return;
        }

        this.placeSearch.classList.add('place-search_active');
        this.placeSearch.parentElement.reset();
    }
}