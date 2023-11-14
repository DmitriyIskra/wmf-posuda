export default class ControlSlider {
    constructor(drawSlider) {
        this.drawSlider = drawSlider;
        this.slider = this.drawSlider.slider;
        this.zoom = this.drawSlider.zoom;

        this.onClick = this.onClick.bind(this);
    }

    init() { 
        this.drawSlider.initSlider();
 
        this.registerEvents();
    }

    registerEvents() {
        this.slider.addEventListener('click', this.onClick);
        this.zoom.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.closest('.slider__arrow-right')) {
            this.drawSlider.moveRight();
        }

        if(e.target.closest('.slider__arrow-left')) {
            this.drawSlider.moveLeft();
        }

        if(e.target.closest('.slider__point-item')) {
            const index = e.target.dataset.index;

            this.drawSlider.moveWithPoint(index);
        }

        if(e.target.matches('.slider-img')) {
            this.drawSlider.openZoom()
        }

        if(e.target.matches('.slider__zoom-arrow-right')) {
            this.drawSlider.moveZoomRight();
        }

        if(e.target.matches('.slider__zoom-arrow-left')) {
            this.drawSlider.moveZoomLeft();
        }

        if(e.target.closest('.slider__zoom-point-item')) {
            const index = e.target.dataset.index;

            this.drawSlider.moveZoomWithPoint(index);
        }

        if(e.target.matches('.slider__wrapper-zoom-container')) {
            this.drawSlider.closeZoom();
        }
    }
}