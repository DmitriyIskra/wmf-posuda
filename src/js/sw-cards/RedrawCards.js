export default class RedrawCards {
    constructor(element) {
        this.element = element;

        this.lastActiveWr = null;
        this.activeCircle = null;
        this.activeLink = null;

        this.startTouch = null;
        this.touchInCircle = null;
        this.maxMargin = null;
    }

    touchStart(targetEl, touchePosition) {
        this.lastActiveWr = targetEl.parentElement;
        this.activeCircle = targetEl;
        this.activeLink = this.activeCircle.nextElementSibling;

        // расщитываем максимальный margin
        this.maxMargin = this.lastActiveWr.offsetWidth - this.activeCircle.offsetWidth - 2;

        // константа от края круга до клика
        this.touchInCircle = touchePosition - this.activeCircle.offsetLeft; 

        // стартовая позиция для margin
        this.startTouch = this.activeCircle.offsetLeft; 
    }

    move(position) {
         // считаем позицию для круга // разница от края круга до места клика
        let calcMargin = position - this.startTouch - this.touchInCircle;
        // для проверки не заходит ли круг за левую сторону обертки
        let checkMinMargin = calcMargin + this.startTouch >= this.startTouch + 2;

        if(calcMargin < this.maxMargin && checkMinMargin) { 
            this.activeCircle.style.marginLeft = `${calcMargin}px`;
        }  
    }

    endTouch(target) {
        // смотрим на каком месте отпустили круг, до куда дотянули
        const result = parseInt(target.style.marginLeft) > this.lastActiveWr.offsetWidth / 2;
        // если больше половины переходим по ссылке
        if(result) {
            this.activeLink.click();
            setTimeout( () => target.style.marginLeft = '4px', 2000 );
            return;
        }

        target.style.marginLeft = '4px';
    }
}