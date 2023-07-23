export default class ControllCards {
    constructor(draw) {
        this.draw = draw;
        this.element = this.draw.element;

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.element.addEventListener('touchstart', this.onTouchStart);
        this.element.addEventListener('touchend', this.onTouchEnd)
    }

    onTouchStart(e) {
        if(e.target.matches('.sw-cards__cards-swipe-circle')) {
            this.draw.touchStart(e.target, e.targetTouches[0].clientX);

            e.target.parentElement.addEventListener('touchmove', this.onTouchMove);
        }
    }

    onTouchMove(e) {
        this.draw.move(e.targetTouches[0].clientX);
    }

    onTouchEnd(e) {
        if(e.target.matches('.sw-cards__cards-swipe-circle')) {
            e.target.parentElement.removeEventListener('touchmove', this.onTouchMove);

            this.draw.endTouch(e.target);
        }
    }
}