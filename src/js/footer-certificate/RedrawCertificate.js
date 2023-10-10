export default class RedrawCertificate {
    constructor(zoom) {
        this.zoom = zoom;
        this.wrImgZoom = this.zoom.querySelector('.cert-zoom__wr-certificates');

        // коэффициент увеличения
        this.ratio = 1.8;
        // данные для первичного расположения блока с сертификатомпм
        this.data = null;
        // актуальный родительский элемент для изображения
        this.parrentEl = null;
        // стартовые размеры блока с изображением
        this.startWidth = null;
        this.startHeight = null;
        // продолжительность анимации
        this.duration = 0.5;
        this.currentImg = null;
    }

    showZoom(el) {
        this.zoom.classList.add('cert-zoom__active');

        // получение данных для первичного размещения 
        // блока с сертификатом
        this.getData(el);

        // отрисовка блока с сертификатом 
        this.renderingImg();
    }

    getData(el) {
        this.parrentEl = el.parentElement;

        const imgSrc = el.src;

        const parrentTop = this.parrentEl.getBoundingClientRect().top;

        const parrentLeft = this.parrentEl.getBoundingClientRect().left;

        const parrentWidth = this.parrentEl.offsetWidth;
        this.startWidth = parrentWidth;

        const parrentHeight = this.parrentEl.offsetHeight;
        this.startHeight = parrentHeight;


        this.data = {
            imgSrc,
            parrentTop,
            parrentLeft,
            parrentWidth,
            parrentHeight,
        }
    }

    renderingImg() {
        this.currentImg = document.createElement('img');
        this.currentImg.src = this.data.imgSrc;
        this.currentImg.classList.add('cert-zoom__img');

        this.wrImgZoom.append(this.currentImg);
        this.wrImgZoom.style = `transition: all ${this.duration}s linear;`
        this.wrImgZoom.style.top = `${this.data.parrentTop}px`;
        this.wrImgZoom.style.left = `${this.data.parrentLeft}px`;
        this.wrImgZoom.style.width = `${this.data.parrentWidth}px`;
        this.wrImgZoom.style.height = `${this.data.parrentHeight}px`;

        setTimeout( () => this.moveImg());
    }

    moveImg() {
        const width = this.wrImgZoom.offsetWidth * this.ratio;
        const height = this.wrImgZoom.offsetHeight * this.ratio;
        const top = (innerHeight / 2) - (height / 2);
        const left = (innerWidth / 2) - (width / 2);
        
        this.wrImgZoom.style.top = `${top}px`;
        this.wrImgZoom.style.left = `${left}px`;
        this.wrImgZoom.style.width = `${width}px`;
        this.wrImgZoom.style.height = `${height}px`;
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    removeImg() {
        const top = this.parrentEl.getBoundingClientRect().top;
        const left = this.parrentEl.getBoundingClientRect().left;

        // !!!!! НАХОДИТЬ АКТУАЛЬНОЕ МЕСТОПОЛОЖЕНИЯ ЭЛЕМЕНТА
        this.wrImgZoom.style.top = `${top}px`;
        this.wrImgZoom.style.left = `${left}px`;
        this.wrImgZoom.style.width = `${this.startWidth}px`;
        this.wrImgZoom.style.height = `${this.startHeight}px`;

        setTimeout( () => this.hideZoom(), this.duration * 1000 )
        
    }
 
    hideZoom() {
            this.zoom.classList.remove('cert-zoom__active');

            this.resetZoom();
    }

    resetZoom() {
        this.currentImg.remove();

        this.currentImg = null;

        this.wrImgZoom.style = '';

        this.data = null;

        this.parrentEl = null;
    
        this.startWidth = null;
        this.startHeight = null;
    }
} 