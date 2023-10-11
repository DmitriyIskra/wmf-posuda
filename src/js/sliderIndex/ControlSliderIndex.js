export default class ControlSliderIndex {
    constructor(draw) {
        this.draw = draw;

        this.slider = this.draw.slider;

        this.onClick = this.onClick.bind(this);
    }

    init() { 
        this.registerEvents();

        this.draw.renderingPagination();
    }

    registerEvents() {
        this.slider.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.closest('.slider-arrows-item-right')) {
            this.draw.moveRight()
        } 

        if(e.target.closest('.slider-arrows-item-left')) {
            this.draw.moveLeft()
        }

        if(e.target.closest('.main__slider-desc-pag-item')) {
            const element = e.target.closest('.main__slider-desc-pag-item');
            this.draw.pagClick(element);
        }
    }
}