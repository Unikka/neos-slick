import $ from 'jquery';
import 'slick-carousel';
import { getCollectionValueByPath, isNil } from './Helper';
import { applyBackendAdjustments } from './Helper/Backend';

const adjustDimensions = slick => {
    const width = parseInt(slick.listWidth);
    const slides = Array.from(slick.$slides);
    slides.forEach(slide => {
        const innerSlide = slide.querySelector('.slide__inner');
        if (!isNaN(width) && !isNil(innerSlide)) {
            innerSlide.style.width = width + 'px';
        }
    });
};

const sliders = $('[data-slick]');
sliders.on('setPosition', function(event, slick) {
    adjustDimensions(slick);
});

sliders.on('init', function(event, slick) {
    if ('neos' in window) {
        applyBackendAdjustments(slick);
    }
    adjustDimensions(slick);
});

sliders.on('reinit', function(event, slick) {
    if ('neos' in window) {
        applyBackendAdjustments(slick);
    }
    adjustDimensions(slick);
});

Array.from(sliders).forEach(slider => {
    const configuration = slider.getAttribute('data-slick');
    const configurationObject =
        configuration != '' ? JSON.parse(configuration) : {};
    $(slider).slick(configurationObject);
});
