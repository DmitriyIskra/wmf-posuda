 export default class ControllCertificat {
    constructor(certificate, draw) {
        this.certificate = certificate;
        this.draw = draw;

        this.zoom = this.draw.zoom;

        this.onClick = this.onClick.bind(this);
    } 

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.certificate.addEventListener('click', this.onClick);
        this.zoom.addEventListener('click', this.onClick);
    }

    onClick(e) {
        if(e.target.closest('.footer-certificate__img')) {
            this.draw.showZoom(e.target.closest('.footer-certificate__img'));
        }

        if(e.target.matches('.cert-zoom__cover')) {
            this.draw.removeImg();
        }
    }
 }