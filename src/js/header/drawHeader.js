export default class DrawHeader {
    constructor(header) {
        this.header = header;

        this.formSearch = this.header.querySelector('.header__form-search');
        this.wrPlaceSearch = this.header.querySelector('.header__wr-place-search');
        this.placeSearch = this.header.querySelector('.header__place-search');
        this.maskSearch = this.header.querySelector('.mask-search')
        this.longLine = this.header.querySelector('.header__long-underline');

        this.wrMobileMenu = this.header.querySelector('.wr-mobile-sub-menu');
        this.mobileList1 = this.wrMobileMenu.querySelector('.mobile-menu-main-list');
        this.mobileMenuActive = null;
        
        this.main = document.querySelector('main');
        this.maskSubMenu = document.querySelector('.mask-sub-menu')
        this.arrSubMenu = null;
        this.arrShortLine = null;
        

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

        // Если при открытии подменю был открыт поиск, он должен закрыться
        if(this.activeIconSearch) {
            // сбрасываем активность иконки поиска и очищаем элемент
            this.activeIconSearch.classList.remove('header__icon-search_active');
            this.activeIconSearch = null;
            
            // у строки ввода удаляем класс активности и сбрасываем форму
            this.wrPlaceSearch.classList.add('place-search_unactive');
            this.maskSearch.style.top = '';
            this.maskSearch.style.height = '';
            this.formSearch.reset();
        }

        // определяем высоту блока main
        let heightMain = this.main.offsetHeight


        // открытие подменю, если еще не было открыто
        if(!this.lastSubMenu) {

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

            // если иконка поиска активна и активно мобильное меню закрываем мобилльное меню
            if(this.mobileMenuActive) {
                this.closeMobileMenu();
            }

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
        // так как кнопка одна и на поиск и на мобильное меню здесь срабатывает
        // просто обнуляем моб меню в этом блоке и не пускаем срабатывать
        if(this.mobileMenuActive) {
            // Убираем отметку что меню открыто
            this.mobileMenuActive = null;

            return;
        }

        // открываем поиск если стоит класс деактивации
        if(this.wrPlaceSearch.matches('.place-search_unactive')) {
            this.wrPlaceSearch.classList.remove('place-search_unactive');

            const heightMain = this.main.offsetHeight;
            const topMask = this.header.getBoundingClientRect().bottom;
            
            this.maskSearch.style.top = `${topMask}px`;
            this.maskSearch.style.height = `${heightMain}px`;

            // setTimeout(() => {
                
            // })
            
            return;
        }

        // если класс деактивации не стоит пройдет сюда и закроет
        this.maskSearch.style.top = '';
        this.maskSearch.style.height = '';

        this.wrPlaceSearch.classList.add('place-search_unactive');
        this.formSearch.reset();
    }




    openMobileMenu() {
        this.wrMobileMenu.classList.remove('unactive-sub');

        setTimeout(() => {
            this.openMobileLevelMain();
        },0)
    }

    openMobileLevelMain() {
        // колличество эллементов
        const amount = this.mobileList1.children.length;
        // высота элемента
        const height = this.mobileList1.children[0].offsetHeight;
  
        this.mobileList1.style.height = `${amount * height}px`;
        // отметка что меню открыто
        this.mobileMenuActive = true;

        // меняем иконку поиска на крестик
        this.redrawIconSearch(document.querySelector('.header__icon-search'));
        
    }

    closeMobileMenu() {
        console.log('closeMobileMenu')
        // сворачиваем меню
        this.mobileList1.style.height = `0px`;
        // скрываем обертку и меню на странице
        this.mobileList1.addEventListener('transitionend', () => {
            this.wrMobileMenu.classList.add('unactive-sub');
            console.log('transitionend')
        }, {once: true})
        
    }
}