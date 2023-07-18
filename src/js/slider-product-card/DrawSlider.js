export default class DrawSlider {
    constructor(sliderContainer) {
        this.sliderContainer = sliderContainer;

        this.slider = this.sliderContainer.querySelector('.slider__slider-container');
        this.zoom = this.sliderContainer.querySelector('.slider__wrapper-zoom-container');

        this.zoomCtrlImg = this.zoom.querySelector('.slider__wr-ctlr-img');
        this.zoomSlider = this.zoom.querySelector('.slider__zoom-slider');

        this.sliderWrapper = this.slider.querySelector('.slider__wr-img-list');
        this.sliderImgList = this.slider.querySelector('.slider__img-list');
        this.amountImg = this.slider.querySelectorAll('img').length;
        this.sliderZoomImgList = this.zoomCtrlImg.querySelector('.slider__zoom-img-list');

        // массив поинтов
        this.points = this.slider.querySelectorAll('.slider__point-item');
        this.zoomPoints = this.zoomCtrlImg.querySelectorAll('.slider__zoom-point-item')

        // Ширина окна слайдера, адаптивность будет работать когда
        //  картинка будет пропорционально меняться в размерах
        // и по блокам будет сделан адаптив
        this.widthSlider = null;
        // клон блока с изображениями 
        this.clone = null;
        // Вычисляемый marginLeft
        this.marginLeft = 0;

        // последний активный поинт контроллера 
        this.lastActivePoint = this.points[0];
        // вспомогательный счетчик
        this.counter = 0;



        // Ширина окна zoom, адаптивность будет работать когда
        //  картинка будет пропорционально меняться в размерах
        // и по блокам будет сделан адаптив
        this.widthZoomSlider = null;
        // клон блока с изображениями 
        this.cloneZoom = null;
        // Вычисляемый marginLeft
        this.marginLeftZoom = 0;

        // последний активный поинт контроллера 
        this.lastActivePointZoom = this.zoomPoints[0];
        // вспомогательный счетчик
        this.counterZoom = 0;
    }


    initSlider() {
        // ИНИЦИАЛИЗИРУЕМ SLIDER
        // Вычисляем ширину окна слайдера
        this.widthSlider = this.slider.offsetWidth;
    }

    moveRight() {
        

        // прибавляем счетчик
        this.counter += 1;

        // если при движении вправо счетчик стал юольше 2, т.е. крайней возможной цифры
        if(this.counter > 2) {
            this.counter = 0
            
            this.marginLeft -= this.widthSlider;

            // Клонируем блок с изображениями
            this.clone = this.sliderImgList.cloneNode(true);
            this.clone.classList.add('clone');

            // переставляем в конец первый блок с картинками, так как мы в конце
            this.sliderWrapper.append(this.clone);

                
            this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;

            // по окончании анимации
            this.sliderWrapper.addEventListener('transitionend', (e) => {
                // убираем класс с transition для последующих манипуляций
                this.sliderWrapper.classList.remove('slider__wr-img-list_transition');

                // Обнуляем margin и удаляем ненужный первый элемент 
                this.marginLeft = 0;
                this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
                this.sliderWrapper.children[0].remove();

                setTimeout(() => {
                    this.sliderWrapper.classList.add('slider__wr-img-list_transition');
                },0)

            }, {once: true});
            
            
            
        } else {
            // ПРОВОДИМ ВЫЧИСЛЕНИЯ
            // вычисляем и обновляем margin
            this.calcMargin('decrement');

            // Назначаем margin
            this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
        }
        
        


        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ
        
        // убираем класс активности с последнего поинта
        this.lastActivePoint.classList.remove('slider__point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePoint = this.points[this.counter];

        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePoint.classList.add('slider__point-item_active');

    }

    moveLeft() {
        // ПРОВОДИМ ВЫЧИСЛЕНИЯ
        // вычисляем и обновляем margin
        

        // прибавляем счетчик
        this.counter -= 1;
        
        // для того чтобы вернуть класс с transition после удаления (удаление происходит ниже)
        if(!this.sliderWrapper.matches('slider__wr-img-list_transition')) {
            this.sliderWrapper.classList.add('slider__wr-img-list_transition');
        }


        if(this.counter < 0) {
    
            this.counter = 2

            // убираем класс с transition для последующих манипуляций
            this.sliderWrapper.classList.remove('slider__wr-img-list_transition');

            // Клонируем блок с изображениями
            this.clone = this.sliderImgList.cloneNode(true);
            this.clone.classList.add('clone');

            // переставляем в начало первый блок с картинками, так как мы в начале
            this.sliderWrapper.prepend(this.clone);

            // Изменили margin left так как слева появился блок   
            this.sliderWrapper.style.marginLeft = `-${this.widthSlider * this.amountImg}px`;

            setTimeout(() => {
                this.sliderWrapper.classList.add('slider__wr-img-list_transition');

                this.marginLeft = (this.widthSlider * this.counter) * -1;

                this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
            },0)


            // по окончании анимации
            this.sliderWrapper.addEventListener('transitionend', (e) => {
                this.sliderWrapper.children[1].remove(); 
            }, {once: true});

            
        } else {
            
            this.calcMargin();

            // Назначаем margin
            this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
        }
        


        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ

        // убираем класс активности с последнего поинта
        this.lastActivePoint.classList.remove('slider__point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePoint = this.points[this.counter];


        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePoint.classList.add('slider__point-item_active');
    }



    moveWithPoint(index) {
        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ
        // убираем класс активности с последнего поинта
        this.lastActivePoint.classList.remove('slider__point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePoint = this.points[+index];

        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePoint.classList.add('slider__point-item_active');


        let newValue;

        if(index > this.counter) {
            // вычисляем новое значение для расчета margin для сдвига слайдера 
            newValue = (this.counter - index) * this.widthSlider;
            
            // переназначаем counter, переводим index в число
            this.counter = +index;
            
            // Вычмсляем margin
            this.marginLeft -= -newValue;
            
            // Назначаем margin
            this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
            
            return;
        }

        // вычисляем новый margin для сдвига слайдера (при вычитании в любом случае нужно 
        // отрицательное число для margin так как сдвиг идет влево)
        newValue = (index - this.counter) * this.widthSlider;

        // переназначаем counter, переводим index в число
        this.counter = +index;

        // Вычмсляем margin
        this.marginLeft += -newValue;

        // Назначаем margin
        this.sliderWrapper.style.marginLeft = `${this.marginLeft}px`;
    }

    calcMargin(mark) {
        // mark === decrement или пусто
        if(mark === 'decrement') {
            this.marginLeft -= this.widthSlider;

            return;
        }

        this.marginLeft += this.widthSlider;

        // чтобы margin-left было всегда отрицательным числом
        if(this.marginLeft > 0) {
            this.marginLeft = this.marginLeft * -1;
        }
    }

    openZoom() {
        this.zoom.classList.add('slider__zoom-active');


        this.widthZoomSlider = this.zoomSlider.offsetWidth;
        
        // определяем и переназначаем активный поинт
        let activePointIndex = this.lastActivePoint.dataset.index
        this.lastActivePointZoom = this.zoomPoints[activePointIndex];
        this.lastActivePointZoom.classList.add('slider__zoom-point-item_active');

        // переопределяем коунтер исходя из активного поинта
        this.counterZoom = parseInt(activePointIndex)

        // определяем margin-left для загрузки с нужной картинки
        this.marginLeftZoom = (this.widthZoomSlider * activePointIndex) * -1;
        this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;

        // вычисляем высоту документа и определяем ее для маски zoom
        let heightBody = document.body.offsetHeight;
        this.zoom.style.height = `${heightBody}px`;

        // вычисляем положение контейнера для элементов zoom на странице, чтобы было по центру 
        let heightSlideContainer = this.zoomCtrlImg.offsetHeight;
        let topSlideContainer = (innerHeight - heightSlideContainer) / 2;
        this.zoomCtrlImg.style.top = `${topSlideContainer}px`;

        // назначаем класс для анимации
        this.zoomSlider.classList.add('slider__img-list_transition');

        
    }

    closeZoom() {
        // убираем класс для анимации
        this.zoomSlider.classList.remove('slider__img-list_transition');

        // очищаем последний поинт элемент
        this.lastActivePointZoom.classList.remove('slider__zoom-point-item_active');
        this.lastActivePointZoom = null;

        // скрываем zoom
        this.zoom.classList.remove('slider__zoom-active');
    }

    calcZoomMargin(mark) {
        // mark === decrement или пусто
        if(mark === 'decrement') {
            this.marginLeftZoom -= this.widthZoomSlider;

            return;
        }

        this.marginLeftZoom += this.widthZoomSlider;
    }

    moveZoomRight() {
        // ПРОВОДИМ ВЫЧИСЛЕНИЯ
        // вычисляем и обновляем margin
        this.calcZoomMargin('decrement');

        // прибавляем счетчик
        this.counterZoom += 1;
        
        // для того чтобы вернуть класс с transition после удаления (удаление происходит ниже)
        // if(!this.zoomSlider.matches('slider__img-list_transition')) {
        //     this.zoomSlider.classList.add('slider__img-list_transition');
        // }

        // если при движении вправо счетчик стал юольше 2, т.е. крайней возможной цифры
        if(this.counterZoom > 2) {
            this.counterZoom = 0
            
            // Клонируем блок с изображениями
            this.cloneZoom = this.sliderZoomImgList.cloneNode(true);
            this.cloneZoom.classList.add('clone');

            // переставляем в конец первый блок с картинками, так как мы в конце
            this.zoomSlider.append(this.cloneZoom);


            this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;
            
            // по окончании анимации
            this.zoomSlider.addEventListener('transitionend', (e) => {
                // убираем класс с transition для последующих манипуляций
                this.zoomSlider.classList.remove('slider__img-list_transition');

                // Обнуляем margin и удаляем ненужный первый элемент 
                this.marginLeftZoom = 0;
                this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;


                this.zoomSlider.children[0].remove();

                setTimeout(() => {
                    this.zoomSlider.classList.add('slider__img-list_transition');
                }, 0)
                
            }, {once: true});

            
            
        } else {
            // Назначаем margin
            this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;
        }
        
        


        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ
        
        // убираем класс активности с последнего поинта
        this.lastActivePointZoom.classList.remove('slider__zoom-point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePointZoom = this.zoomPoints[this.counterZoom];

        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePointZoom.classList.add('slider__zoom-point-item_active');

    }

    moveZoomLeft() {
        // ПРОВОДИМ ВЫЧИСЛЕНИЯ
        // вычисляем и обновляем margin
        this.calcZoomMargin();

        // прибавляем счетчик
        this.counterZoom -= 1;
        
        // для того чтобы вернуть класс с transition после удаления (удаление происходит ниже)
        if(!this.zoomSlider.matches('slider__img-list_transition')) {
            this.zoomSlider.classList.add('slider__img-list_transition');
        }


        // Если пошли по кругу
        if(this.counterZoom < 0) {
    
            this.counterZoom = 2


            // Клонируем блок с изображениями
            this.cloneZoom = this.sliderZoomImgList.cloneNode(true);
            this.cloneZoom.classList.add('clone');

            // убираем transition для подмены свойств и блоков
            this.zoomSlider.classList.remove('slider__img-list_transition');

            // переставляем в конец первый блок с картинками, так как мы в конце
            this.zoomSlider.prepend(this.cloneZoom);                                    // эту часть

            // меняем margin-left так как подставлен блок
            this.zoomSlider.style.marginLeft = `${(this.widthZoomSlider * 3 ) * -1}px`; // и эту попробовать в timeout

            // возвращаем transition двигаем блок
            setTimeout(() => {
                this.zoomSlider.classList.add('slider__img-list_transition')
                this.marginLeftZoom = (this.widthZoomSlider * 2) * -1;
                this.zoomSlider.style.marginLeft = `${(this.widthZoomSlider * 2) * -1}px`;
            }, 0)

            
            
            // по окончании анимации
            this.zoomSlider.addEventListener('transitionend', (e) => {
                    // когда анимация закончилась удаляем правый элемент
                    this.zoomSlider.children[1].remove();
                
            }, {once: true});

            
        } else {
            // Назначаем margin
            this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;
        }
        

        



        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ

        // убираем класс активности с последнего поинта
        this.lastActivePointZoom.classList.remove('slider__zoom-point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePointZoom = this.zoomPoints[this.counterZoom];


        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePointZoom.classList.add('slider__zoom-point-item_active');
    }


    moveZoomWithPoint(index) {
        // ПЕРЕКЛЮЧЕНИЕ ПОИНТОВ
        // убираем класс активности с последнего поинта
        this.lastActivePointZoom.classList.remove('slider__zoom-point-item_active');

        // Обновляем последний активный поинт
        this.lastActivePointZoom = this.zoomPoints[+index];

        // Ставим класс активности к обновленному последнему поинту
        this.lastActivePointZoom.classList.add('slider__zoom-point-item_active');


        let newValue;

        if(+index > this.counterZoom) {
            // вычисляем новое значение для расчета margin для сдвига слайдера 
            newValue = (this.counterZoom - +index) * this.widthZoomSlider;
            
            // переназначаем counter, переводим index в число
            this.counterZoom = +index;
            
            // Вычмсляем margin
            this.marginLeftZoom -= -newValue; 
            
            // Назначаем margin
            this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;
            
            return;
        }

        // вычисляем новый margin для сдвига слайдера (при вычитании в любом случае нужно 
        // отрицательное число для margin так как сдвиг идет влево)
        newValue = (+index - this.counterZoom) * this.widthZoomSlider;

        // переназначаем counter, переводим index в число
        this.counterZoom = +index;

        // Вычмсляем margin
        this.marginLeftZoom += -newValue;

        // Назначаем margin
        this.zoomSlider.style.marginLeft = `${this.marginLeftZoom}px`;
    }
}