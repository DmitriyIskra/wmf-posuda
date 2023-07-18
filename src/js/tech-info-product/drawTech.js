export default class DrawInfo {
    constructor(techInfo) {
        this.techInfo = techInfo;

        this.techHaracteristic = this.techInfo.querySelector('.tech-haracteristic');
        this.infoFiles = this.techInfo.querySelector('.info-files');

        this.table = this.techInfo.querySelector('.main__table-tech-list');
        this.files = this.techInfo.querySelector('.main__info-files-list');

        this.marginBottomFiles = null;
    }


    redrawControlPanel(mark) {
        if(mark) {
            // переключаем активность у кнопок
            this.techHaracteristic.classList.remove('active-tech-info');
            this.infoFiles.classList.add('active-tech-info');

            // добавляем рамку справа к info-files
            this.infoFiles.style.borderRight = '0.10vw dashed #777777';

            // переключаем активность на контенте
            this.table.classList.add('unactive-tech-info');
            this.files.classList.remove('unactive-tech-info');

            return;
        }

        // переключаем активность у кнопок
        this.infoFiles.classList.remove('active-tech-info');
        this.techHaracteristic.classList.add('active-tech-info');

        // убираем рамку справа в info-files
        this.infoFiles.style.borderRight = '';

        // переключаем активность на контенте
        this.files.classList.add('unactive-tech-info');
        this.table.classList.remove('unactive-tech-info');
    }
}