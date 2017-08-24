require('../styles/styles.scss');
const $ = require("jquery");

import Racer from './racer';

let domLoaded = () => {
  const $body = $("body");
  const racersContainer = $body.find(".racer-container");

  if (racersContainer.length > 0) {
    new Racer(racersContainer);
  }
}

// document.addEventListener("DOMContentLoaded", domLoaded);
window.onload = domLoaded;
