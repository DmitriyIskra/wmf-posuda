import ControlHeader from './header/ControlHeader.js';
import DrawHeader from './header/drawHeader.js';

import ControlSliderIndex from './sliderIndex/ControlSliderIndex.js';
import DrawSliderIndex from './sliderIndex/DrawSliderIndex.js';
 
import ControlSlider from './slider-product-card/ControlSlider.js';
import DrawSlider from './slider-product-card/DrawSlider.js';

import ControlTech from './tech-info-product/ControlTech.js';
import DrawInfo from './tech-info-product/drawTech.js'; 

import ControllCards from './sw-cards/ControllCards.js';
import RedrawCards from './sw-cards/RedrawCards.js';

import ControlAsideFilter from './aside-filter/controlAsideFilter.js';
import RedrawAsideFilter from './aside-filter/RedrawAsideFilter.js';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import ControlAdvantages from './controlAdvantages/controlAdvantages.js';
import RedrawAdvantages from './controlAdvantages/RedrawAdvantages.js';

import ControlCallback from './callback-form/ControlCallback.js';
import Http from './callback-form/Http.js';
import RedrawCallback from './callback-form/RedrawCallback.js';
import ValidationForm from './callback-form/Validation.js';
import IMask from 'imask';

import ControllCertificat from './footer-certificate/ControlCertificate.js';
import RedrawCertificate from './footer-certificate/RedrawCertificate.js';




// START HEADER

const header = document.querySelector('.header');

const drawHeader = new DrawHeader(header)
const controlHeader = new ControlHeader(drawHeader);
controlHeader.init();

// FINISH HEADER


// START SLIDER MAIN PAGE
    const sliderIndex = document.querySelector('.main_wrapper-slider');

    if(sliderIndex) {
        console.log(document.readyState)
        const drawSliderIndex = new DrawSliderIndex(sliderIndex);
        const controlSliderIndex = new ControlSliderIndex(drawSliderIndex);
        controlSliderIndex.init();
    }

// END SLIDER MAIN PAGE


// START SLIDER PAGE PRODUCT

const slider = document.querySelector('.slider');

if(slider) {
    const drawSlider = new DrawSlider(slider);
    const controlSlider = new ControlSlider(drawSlider);
    controlSlider.init();
}

// SLIDER PAGE PRODUCT FINISH



// START TECH-INFO

const techInfo = document.querySelector('.main__wr-tech-info');

if(techInfo) {
    const drawInfo = new DrawInfo(techInfo);
    const controlTech = new ControlTech(drawInfo);
    controlTech.init();
}


// FINISH TECH-INFO
 

// START SWIPE-CARDS
// блоку в котором находятся элементы свайпа присваиваем класс .swipe-lines__wrapper

const swipeLinesWrapper = document.querySelector('.swipe-lines__wrapper')

if(swipeLinesWrapper) {
    const redrawCards = new RedrawCards(swipeLinesWrapper);
    const controllCards = new ControllCards(redrawCards);

    controllCards.init();
}


// S T A R T  S L I D E R  S W I P E R

const swiper = new Swiper('.swiper', {
    modules: [Pagination],
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination', 
      clickable: true
    },

});

// E N D  S L I D E R  S WI P E R


// S T A R T  S L I D E R  F I L T E R

const filter = document.querySelector('.filter');

if(filter) {
    const redrawAsideFilter = new RedrawAsideFilter(filter);
    const controlAsideFilter = new ControlAsideFilter(redrawAsideFilter);
    controlAsideFilter.init()
}

// E N D  S L I D E R  F I L T E R


// S T A R T  A D V A N T A G E S

const advantages = document.querySelector('.advantages__wrapper')

if(advantages) {

    const controlAdvantages = document.querySelector('.advantages__control-list');
    const cards = document.querySelectorAll('.advantages__card');
    const carrentActiveControl = document.querySelector('.advantages__control_active');
    const underlineList = document.querySelectorAll('.advantages__underline')


    const redraw = new RedrawAdvantages(controlAdvantages, carrentActiveControl, underlineList, cards);
    const control = new ControlAdvantages(redraw);
    control.init();

} 
// E N D  A D V A N T A G E S


// S T A R T  C A L B A C K  F O R M

const pageVase = document.querySelector('.main__button-feedback');
const errorPage = document.querySelector('.not-found__link-callback-form');

const getFormButton = pageVase || errorPage;

if(getFormButton) {
    const regExpPhone = /^\+7\(\d{1,3}\)\d{3}-\d{2}-\d{2}$/ ///^\+7(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i;
 
    const validationForm = new ValidationForm(regExpPhone, regExpEmail)
    const redrawCallback = new RedrawCallback();// 
    const http = new Http('https://v.isttrade.ru/wmfposuda/modal-form.html'); // ../modal-form.html
    const controlCallback = new ControlCallback(getFormButton, http, redrawCallback, validationForm, IMask);
    controlCallback.init();
}

// E N D  C A L B A C K  F O R M



// S T A R T  C E R T I F I C A T E

const certificate = document.querySelector('.footer-certificate__list');

if(certificate) {

    const zoom = document.querySelector('.cert-zoom__cover');

    const redrawCertificate = new RedrawCertificate(zoom);
    const controllCertificat = new ControllCertificat(certificate, redrawCertificate);
    controllCertificat.init();
}
