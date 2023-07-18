export default class ControlTech {
    constructor(drawInfo) {
        this.drawInfo = drawInfo;

        this.onClick = this.onClick.bind(this);
    }

    init() {
        // регистрируем события
        this.registerEvents();
    }

    registerEvents() {
        this.drawInfo.techInfo.addEventListener('click', this.onClick)
    }


    onClick(e) {
        // если клик по кнопке info-files отправляем метку files
        if( e.target.closest('.info-files')) {
            this.drawInfo.redrawControlPanel('files');

            return;
        }

        // если клик по кнопке с таблицей метку не отправляем вообще
        this.drawInfo.redrawControlPanel();
    }
}