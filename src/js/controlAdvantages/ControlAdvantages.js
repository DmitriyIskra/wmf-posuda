export default class ControlAdvantages {
    constructor(draw) {
        this.draw = draw;

        this.onClick = this.onClick.bind(this);
    }

    init() { 
        
        this.registerEvents();
    }

    registerEvents() {
        this.draw.control.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.closest('.advantages__wr-control-item')) {
            this.draw.redraw(e.target.closest('.advantages__wr-control-item'));
        }
    }
}