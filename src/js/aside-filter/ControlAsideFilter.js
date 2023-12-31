export default class ControlAsideFilter {
    constructor( draw ) {
        this.draw = draw;
        this.filter = this.draw.filter;
        // this.sub = this.draw.sub

        this.onClick = this.onClick.bind(this); 
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this); 
        this.onTouchStart = this.onTouchStart.bind(this); 
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.filter.addEventListener('click', this.onClick); // this.filter
        this.filter.addEventListener('mouseover', this.onMouseOver);
        this.filter.addEventListener('mouseout', this.onMouseOut);
        this.filter.addEventListener('touchstart', this.onTouchStart);
    }

    onClick(e) {
        if(e.target.closest('.filter__main-item-title-box')) {
            this.draw.redrawMainItem(e.target.closest('.filter__main-item-title-box'));
        }

        if(e.target.closest('.filter__sub-item-title-box')) {
            this.draw.redrawSubItem(e.target.closest('.filter__sub-item-title-box'));
        }

        if(e.target.closest('.filter__reset-button')) {
            console.log('work button')
            this.draw.clearFilter();
        }
    }

    onMouseOver(e) {
        if(e.target.matches('.filter__sub-item-title-box')) {
            this.draw.addDecorationTitle(e.target.closest('.filter__sub-item-title-box'));
        }

        if(!e.target.closest('.filter__sub-item-title-box')) {
            this.draw.removeDecorationTitle();
        }
    }

    onMouseOut(e) {
        if(e.relatedTarget && !e.relatedTarget.closest('.filter')) {
            this.draw.removeDecorationTitle();
        }
    }

    onTouchStart(e) {
        if(e.target.closest('.filter__sub-item-title-box')) {
            const element = e.target.closest('.filter__sub-item-title-box');
            this.draw.redrawUnderLineForToch(element);
        }
    }
}