export default class ControlSliderIndex {
    constructor(draw) {
        this.draw = draw;

        this.slider = this.draw.slider;

        this.onClick = this.onClick.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.slider.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.matches('.slider-arrows-item-right')) {
            this.draw.moveRight()
        }

        if(e.target.matches('.slider-arrows-item-left')) {
            this.draw.moveLeft()
        }
    }
}