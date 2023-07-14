export default class DrawSliderIndex {
    constructor(slider) {
        this.slider = slider;

        this.scrollLine = this.slider.querySelector('.main__wr-slider-scroll-line');
        this.sliderList = this.slider.querySelector('.main__slider-list');
        this.slides = this.slider.querySelectorAll('.main__slider-item')

        this.counter = 0
    }

    moveRight() {
        this.counter += 1

        const widthSlider = innerWidth;

        if(this.counter <= 2) {
            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;
        }
        
        if(this.counter > 2) {
            console.log('work', this.counter)
            const clone = this.sliderList.cloneNode(true);

            this.sliderList.after(clone);

            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;

            setTimeout(() => {
                this.scrollLine.style.transition = 'none'

                this.scrollLine.children[0].remove();

                this.scrollLine.style.transform = `translateX(${0}px)`;
    
                this.sliderList = this.slider.querySelector('.main__slider-list');
            }, 299)
            
            this.counter = 0;
        }

        this.scrollLine.style.transition = 'all 0.3s linear';

        
    }


    moveLeft() {
        this.counter -= 1

        const widthSlider = innerWidth;

        if(this.counter < 0) {
            this.scrollLine.style.transition = 'none'

            const clone = this.sliderList.cloneNode(true);

            this.sliderList.before(clone);

            this.scrollLine.style.transform = `translateX(${(widthSlider * this.slides.length) * -1}px)`;

            this.counter = 2

            setTimeout(() => {
                this.scrollLine.style.transition = 'all 0.3s linear';

                this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`;

                this.sliderList = this.slider.querySelector('.main__slider-list');
            }, 0)

            setTimeout(() => {
                this.scrollLine.children[1].remove();
            }, 350)
            
            return;
        }

        if(this.counter >= 0) {
            console.log('more 0', this.counter)
            this.scrollLine.style.transform = `translateX(${(widthSlider * this.counter) * -1}px)`
        }

    }

}