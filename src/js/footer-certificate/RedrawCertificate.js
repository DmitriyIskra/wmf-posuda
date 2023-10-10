export default class RedrawCertificate {
    constructor(zoom) {
        this.zoom = zoom;
        this.wrImg = this.zoom.querySelector('.cert-zoom__wr-certificates');

        // коэффициент увеличения
        this.ratio = 1.8;
        // данные для первичного расположения блока с сертификатомпм
        this.data = null;
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
        this.renderingImg()
    }

    getData(el) {
        const parrentEl = el.parentElement;
        console.log('parrentEl', parrentEl)

        const imgSrc = el.src;
        console.log('imgSrc', imgSrc)
        const parrentTop = parrentEl.getBoundingClientRect().top;
        console.log('imgTop', parrentTop)
        const parrentLeft = parrentEl.getBoundingClientRect().left;
        console.log('imgLeft', parrentLeft)
        const parrentWidth = parrentEl.offsetWidth;
        console.log('imgWidth', parrentWidth)
        const parrentHeight = parrentEl.offsetHeight;
        console.log('imgHeight', parrentHeight)

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

        this.wrImg.append(this.currentImg);
        this.wrImg.style = `transition: all ${this.duration}s linear;`
        this.wrImg.style.top = `${this.data.parrentTop}px`;
        this.wrImg.style.left = `${this.data.parrentLeft}px`;
        this.wrImg.style.width = `${this.data.parrentWidth}px`;
        this.wrImg.style.height = `${this.data.parrentHeight}px`;

        setTimeout( () => this.moveImg());
    }

    moveImg() {
        const width = this.wrImg.offsetWidth * this.ratio;
        const height = this.wrImg.offsetHeight * this.ratio;
        const top = (innerHeight / 2) - (height / 2);
        const left = (innerWidth / 2) - (width / 2);
        
        this.wrImg.style.top = `${top}px`;
        this.wrImg.style.left = `${left}px`;
        this.wrImg.style.width = `${width}px`;
        this.wrImg.style.height = `${height}px`;
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    removeImg() {
        // !!!!! НАХОДИТЬ АКТУАЛЬНОЕ МЕСТОПОЛОЖЕНИЯ ЭЛЕМЕНТА
        this.wrImg.style.top = `${this.data.parrentTop}px`;
        this.wrImg.style.left = `${this.data.parrentLeft}px`;
        this.wrImg.style.width = `${this.data.parrentWidth}px`;
        this.wrImg.style.height = `${this.data.parrentHeight}px`;

        this.hideZoom()
    }
 
    hideZoom() {
        setTimeout( () => {
            this.zoom.classList.remove('cert-zoom__active');

            this.currentImg.remove();
            console.log('this.currentImg.remove()', this.currentImg)
            this.currentImg = null;
        }, this.duration);
    }
} 