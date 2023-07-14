import ControlHeader from './header/ControlHeader.js';
import DrawHeader from './header/drawHeader.js';

// START HEADER

const header = document.querySelector('.header');

const drawHeader = new DrawHeader(header)
const controlHeader = new ControlHeader(drawHeader);
controlHeader.init();

// FINISH HEADER