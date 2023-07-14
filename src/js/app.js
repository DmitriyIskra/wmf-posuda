import ControlHeader from './header/ControlHeader.js';
import DrawHeader from './header/drawHeader.js';

import ControlSliderIndex from './sliderIndex/ControlSliderIndex.js';
import DrawSliderIndex from './sliderIndex/DrawSliderIndex.js';

// START HEADER

const header = document.querySelector('.header');

const drawHeader = new DrawHeader(header)
const controlHeader = new ControlHeader(drawHeader);
controlHeader.init();

// FINISH HEADER


// START SLIDER MAIN PAGE

const sliderIndex = document.querySelector('.main_wrapper-slider');

const drawSliderIndex = new DrawSliderIndex(sliderIndex);
const controlSliderIndex = new ControlSliderIndex(drawSliderIndex);
controlSliderIndex.init();

// END SLIDER MAIN PAGE