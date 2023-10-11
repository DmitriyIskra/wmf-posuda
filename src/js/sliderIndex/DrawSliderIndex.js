export default class DrawSliderIndex {
    constructor(slider) {
        this.slider = slider;

        this.scrollLine = this.slider.querySelector('.main__wr-slider-scroll-line');
        this.sliderList = this.slider.querySelector('.main__slider-list');
        this.slides = this.slider.querySelectorAll('.main__slider-item');
        this.wrPagination = this.slider.querySelector('.main__desc-slider-pagination');

        // количество элементов пагинации
        this.amountDots = this.slides.length;
        this.activeDot = null;
        this.counter = 0
    }
 
    renderingPagination() {
        
        for( let i = 0; i < this.amountDots; i += 1 ) {

            const dot = document.createElement('li');
            dot.classList.add('main__slider-desc-pag-item');
            dot.dataset.num = i;

            if(i === 0) {
                dot.classList.add('main__slider-desc-pag-item_active');

                this.activeDot = dot;
            }

            this.wrPagination.append(dot);

        }

        // вычислияем смещение пагинации во vw
        // 26.51 это по центру, отнего сдвигаем влево на половину пагинации
        const widthPag = this.wrPagination.offsetWidth / 2;
        const widthDoc = innerWidth;
        const pxToVw = widthPag / widthDoc * 100;
        const offsetX = 26.51 - pxToVw;

        this.wrPagination.style = `transform: translate(${-offsetX}vw, ${-2.34}vw);`;
    }

    pagClick(element) {
        if(element.matches('.main__slider-desc-pag-item_active')) return;

        this.counter = +element.dataset.num;

        const widthSlider = innerWidth;

        this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;

        // переключение активной пагинации
        this.redrawingPag();
    }

    redrawingPag() {
        // переключение активной пагинации
        this.activeDot.classList.remove('main__slider-desc-pag-item_active');
        this.activeDot = this.wrPagination.children[this.counter];
        this.activeDot.classList.add('main__slider-desc-pag-item_active');
    }

    moveRight() {  
        this.counter += 1

        const widthSlider = innerWidth;

        if(this.counter <= 2) {
            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;
        }
        
        if(this.counter > 2) {
            const clone = this.sliderList.cloneNode(true);

            this.sliderList.after(clone);

            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;

            setTimeout(() => {
                this.scrollLine.style.transition = 'none'

                this.scrollLine.children[0].remove();

                this.scrollLine.style.transform = `translateX(${0}px)`;
    
                this.sliderList = this.slider.querySelector('.main__slider-list');
            }, 499)
            
            this.counter = 0;
        }

        this.scrollLine.style.transition = 'all 0.5s linear';

        this.redrawingPag();
    }


    moveLeft() {
        this.counter -= 1

        const widthSlider = innerWidth;

        if(this.counter < 0) {
            this.scrollLine.style.transition = 'none';

            const clone = this.sliderList.cloneNode(true);

            this.sliderList.before(clone);

            this.scrollLine.style.transform = `translateX(${(widthSlider * this.slides.length) * -1}px)`;

            this.counter = 2

            setTimeout(() => {
                this.scrollLine.style.transition = 'all 0.5s linear';

                this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;

                this.sliderList = this.slider.querySelector('.main__slider-list');
            }, 0)

            setTimeout(() => {
                this.scrollLine.children[1].remove();
            }, 550)

            // переключение активной пагинации
            this.redrawingPag();
            
            return;
        }

        if(this.counter >= 0) {
            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`
        }

        // переключение активной пагинации
        this.redrawingPag()
    }

}