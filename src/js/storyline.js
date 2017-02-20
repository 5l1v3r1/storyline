import { Chart } from './chart';
import { DataFactoryFunc } from './data';
import { Slider } from './slider';

var Storyline = function(targetId, config) {
  var self = this;
  this.container = document.getElementById(targetId);
  this.height = this.container.getAttribute('height');
  this.container.style.height = this.height + "px";
  this.width = this.container.getAttribute('width');
  this.container.style.width = this.width + "px";
  this.slider = new Slider(config.slides, config.startIndex);
  var slider = this.slider;

  var data = new DataFactoryFunc;

  (data.fetchData(config)).then(function(dataObj) {
    storyline.chart = new Chart(dataObj, storyline.width, storyline.height, storyline.margin);
    var chart = storyline.chart;

    self.appendChart(chart);
    self.appendSlider(slider);
    slider.moveSlide();
    slider.attachClickHandler(chart.markers);
  });
}
Storyline.prototype = {
  attr: function(dimension, value) {
    if(dimension == "height") {
      this.height = value;
      this.container.style.height = value + "px";
    } else if(dimension == "width") {
      this.width = value;
      this.container.style.width = value + "px";
    } else if(dimension == "margin") {
      this.margin = value;
    }
  },
  buildSlides: function(config, targetId) {
    config
  },
  appendChart: function(chart) {
    this.container.appendChild(chart.canvas);
    //chart.setWidth(this.width)
  },
  appendSlider: function(slider) {
    this.container.appendChild(slider.elem);
    slider.setWidth(this.width)
    slider.elem.style.opacity = 1;
  }
}

module.exports = {
  Storyline
}
