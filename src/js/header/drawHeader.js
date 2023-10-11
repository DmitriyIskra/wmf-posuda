export default class DrawHeader {
    constructor(header) {
        this.header = header;

        this.formSearch = this.header.querySelector('.header__form-search');
        this.wrPlaceSearch = this.header.querySelector('.header__wr-place-search');
        this.placeSearch = this.header.querySelector('.header__place-search');
        this.maskSearch = this.header.querySelector('.mask-search')
        this.longLine = this.header.querySelector('.header__long-underline');

        this.wrMobileMenu = this.header.querySelector('.wr-mobile-sub-menu');
        // первый, главный уровень меню
        this.mobileList1 = this.wrMobileMenu.querySelector('.mobile-menu-main-list');
        this.lastMobileList2 = null;
        this.lastMobileList3 = null; 
        this.lastTargetLevel1 = null; 
        this.lastTargetLevel2 = null;

        // Отмечаем активно ли мобильное меню
        this.mobileMenuActive = null;
        // сюда сохраняем крайние открытые подменюшки в обратном порядке
        // т.е. третий уровень будет под 0 индексом чтоб закрывать в обратном порядке
        this.lastItemMobileMenu = [];
        this.openMobileLevel = 0;
        
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
            this.maskSearch.classList.add('place-search_unactive');
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
        if(this.maskSearch.matches('.place-search_unactive')) {
            this.maskSearch.classList.remove('place-search_unactive');

            const heightMain = this.main.offsetHeight;
            const topMask = this.header.getBoundingClientRect().bottom;
            
            this.maskSearch.style.top = `${topMask}px`;
            this.maskSearch.style.height = `${heightMain}px`;

            return;
        }

        // если класс деактивации не стоит пройдет сюда и закроет
        this.maskSearch.style.top = '';
        this.maskSearch.style.height = '';

        this.maskSearch.classList.add('place-search_unactive');
        this.formSearch.reset();
    }




    openMobileMenu() {
        this.wrMobileMenu.classList.remove('unactive-sub');

        setTimeout(() => {
            this.openMobileLevelMain();
        },0)
    }

    openMobileLevelMain() {
        if(!this.mobileMenuActive) {
            // колличество эллементов
            const amount = this.mobileList1.children.length;
            // высота элемента
            const height = this.mobileList1.children[0].offsetHeight;

            this.mobileList1.style.height = `${amount * height}px`;

            // отметка что меню открыто
            this.mobileMenuActive = true;


            // Вычисляем высоту main для отрисовки mask
            const mainHeight = this.main.offsetHeight;
            // Присваиваем высоту маске
            this.maskSubMenu.style.height = `${mainHeight}px`;

            // меняем иконку поиска на крестик
            this.redrawIconSearch(document.querySelector('.header__icon-search'));
        }
        
        
    }

    controlUnderItemsMenu(target, elForOpen) {
         // ОТКРЫВАЕМ ПОДМЕНЮШКИ

        if(elForOpen.matches('.list-level-2')) {
            this.controlLevelMenu2(target, elForOpen);
        }

        if(elForOpen.matches('.list-level-3')) {
            this.controlLevelMenu3(target, elForOpen);
        }
 
    }

    controlLevelMenu2(target, elForOpen) {
        if(!this.lastMobileList2) {
            this.lastMobileList2 = elForOpen;
            this.lastTargetLevel1 = target

            // Определяем колличество дочерних элементов
            let amountChildrenElements = elForOpen.children.length;
            // Определяем высоту таргета
            let heightTarget = target.offsetHeight;
    
            // Вычисляем высоту для подэлемента
            let heightElOpen = heightTarget * amountChildrenElements;
    
            
            this.mobileList1.style.height = 'min-content';
            
            // Открываем нижний элемент
            elForOpen.style.height = `${heightElOpen}px`;
            // Меняем стрелку
            this.lastTargetLevel1.classList.add('mobile-menu-main-item_title_active');  // openmain

            elForOpen.addEventListener('transitionend', (e) => {
                let heightList1 = this.mobileList1.offsetHeight;
                this.mobileList1.style.height = `${heightList1}px`;
            }, {once: true})

            return;
        } 

        // если повторный клик по элементу уровня 2 закрываем
        if(this.lastMobileList2 && elForOpen === this.lastMobileList2) {
            this.mobileList1.style.height = 'min-content';

            // если третий левел открыт закрываем
            if(this.lastMobileList3) {
                this.controlLevelMenu3();
            }

            // Открываем нижний элемент
            this.lastMobileList2.style.height = ``;

            this.lastMobileList2.addEventListener('transitionend', (e) => {
                let heightList1 = this.mobileList1.offsetHeight;
                this.mobileList1.style.height = `${heightList1}px`;

                this.lastMobileList2 = null;
                this.lastTargetLevel = null;
            }, {once: true})

            this.lastTargetLevel1.classList.remove('mobile-menu-main-item_title_active'); // closemain
 
            return;
        }

        // если какой то из уровней 2 открыт, а клик по другому элементу уровня 2 
        if(this.lastMobileList2 && elForOpen !== this.lastMobileList2) {
            // подменяем свойство у самой верхней обертки
            this.mobileList1.style.height = 'min-content';

            // если третий левел открыт закрываем
            if(this.lastMobileList3) {
                this.controlLevelMenu3();
            }

            // обнуляем высоту у прошлого элемента второго уровня
            this.lastMobileList2.style.height = '';
            this.lastTargetLevel1.classList.remove('mobile-menu-main-item_title_active'); // closemain
            // обнуляем историю о прошлом элементе 2 уровня
            setTimeout(() => {
                this.lastMobileList2 = null;
                this.lastTargetLevel1 = null;
            }, 0);

            // перезапускаем метод чтоб открыть новый элемент второго уровня с нуля
            setTimeout(() => this.controlLevelMenu2(target, elForOpen), 0);
            
            return;
        }
    }

    controlLevelMenu3(target, elForOpen) {
        if(!this.lastMobileList3) {
            this.lastMobileList3 = elForOpen;
            this.lastTargetLevel2 = target;
            // Определяем колличество дочерних элементов
            let amountChildrenElements = elForOpen.children.length;
            // Определяем высоту таргета
            let heightTarget = target.offsetHeight;
    
            // Вычисляем высоту для подэлемента
            let heightElOpen = heightTarget * amountChildrenElements;
    
            
            this.mobileList1.style.height = 'min-content';
            this.lastMobileList2.style.height = 'min-content';
            this.lastMobileList3.parentElement.style.height = 'min-content'; // 15.73vw;
            
            // Открываем нижний элемент
            this.lastMobileList3.style.height = `${heightElOpen}px`;
            // меняем стрелку
            this.lastTargetLevel2.classList.add('level-active');

            this.lastMobileList3.addEventListener('transitionend', (e) => {
                let heightList1 = this.mobileList1.offsetHeight;
                this.mobileList1.style.height = `${heightList1}px`;
            
                let heightMobileList2 = this.lastMobileList2.offsetHeight;
                this.lastMobileList2.style.height = `${heightMobileList2}px`;

                let heightParentEl = this.lastMobileList3.parentElement.offsetHeight;
                this.lastMobileList3.parentElement.style.height = `${heightParentEl}px`
            }, {once: true})

            return;
        } 

        this.mobileList1.style.height = 'min-content';
        this.lastMobileList2.style.height = 'min-content';
        this.lastMobileList3.parentElement.style.height = 'min-content'; // 15.73vw;

        // Закрываем третий уровень
        this.lastMobileList3.style.height = ``;

        // меняем стрелку
        this.lastTargetLevel2.classList.remove('level-active');

        this.lastMobileList3.addEventListener('transitionend', (e) => {
            let heightList1 = this.mobileList1.offsetHeight;
            this.mobileList1.style.height = `${heightList1}px`;
            
            if(this.lastMobileList2) {
                let heightMobileList2 = this.lastMobileList2.offsetHeight;
                this.lastMobileList2.style.height = `${heightMobileList2}px`;
            }
            
            let heightParentEl = this.lastMobileList3.parentElement.offsetHeight;
            this.lastMobileList3.parentElement.style.height = `${heightParentEl}px`;

            // обнуляем последний активный левел 3
            this.lastMobileList3 = null;
            this.lastTargetLevel2 = null;
        }, {once: true})

        
    }
    

    closeMobileMenu() {
        // сворачиваем меню
        // если третий левел открыт закрываем
        if(this.lastMobileList3) {
            this.lastMobileList3.style.height = '';
            this.lastMobileList3.parentElement.style.height = '15.73vw';
            this.lastMobileList2.style.height = '';
            this.lastTargetLevel1.classList.remove('mobile-menu-main-item_title_active'); //closemain
            this.lastTargetLevel2.classList.remove('level-active');
        }
        
        // если открыто меню левел 2 без левел 3 закрываем
        if(this.lastMobileList2 && !this.lastMobileList3) {
            this.lastMobileList2.style.height = '';
            this.lastMobileList2 = null;
            this.lastTargetLevel1.classList.remove('mobile-menu-main-item_title_active'); //closemain
        }

        setTimeout(() => this.mobileList1.style.height = ``, 0); 


        // скрываем обертку и меню на странице
        this.mobileList1.addEventListener('transitionend', () => {
            this.wrMobileMenu.classList.add('unactive-sub');
            this.mobileMenuActive = null;

            this.lastMobileList3 = null;
            this.lastMobileList2 = null;

            this.lastTargetLevel1 = null;
            this.lastTargetLevel2 = null
        }, {once: true})

        // Убираем высоту маске
        this.maskSubMenu.style.height = ``;  
        
    }
}