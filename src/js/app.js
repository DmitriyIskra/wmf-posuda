import ControlHeader from './header/ControlHeader.js';
import DrawHeader from './header/drawHeader.js';

import ControlSliderIndex from './sliderIndex/ControlSliderIndex.js';
import DrawSliderIndex from './sliderIndex/DrawSliderIndex.js';

import ControlSlider from './slider-product-card/ControlSlider.js';
import DrawSlider from './slider-product-card/DrawSlider.js';

import ControlTech from './tech-info-product/ControlTech.js';
import DrawInfo from './tech-info-product/drawTech.js';

import ControllCards from './sw-cards/controllCards.js';
import RedrawCards from './sw-cards/RedrawCards.js';

import ControlAsideFilter from './aside-filter/controlAsideFilter.js';
import RedrawAsideFilter from './aside-filter/RedrawAsideFilter.js';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';






// START HEADER

const header = document.querySelector('.header');

const drawHeader = new DrawHeader(header)
const controlHeader = new ControlHeader(drawHeader);
controlHeader.init();

// FINISH HEADER


// START SLIDER MAIN PAGE

const sliderIndex = document.querySelector('.main_wrapper-slider');

if(sliderIndex) {
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

const cardsIndex = document.querySelector('.sw-cards__cards-list');
const cardsSynergy = document.querySelector('.ssl__cards-list');

if(cardsSynergy) {
    const redrawCards = new RedrawCards(cardsSynergy);
    const controllCards = new ControllCards(redrawCards);

    controllCards.init();
}

if(cardsIndex) {
    const redrawCards = new RedrawCards(cardsIndex);
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