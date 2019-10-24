import $ from 'jquery';
import 'slick-carousel';

const adjustDimensions = slick => {
    const width = parseInt(slick.listWidth);
    const slides = Array.from(slick.$slides);
    slides.forEach(slide => {
        const innerSlide = slide.querySelector('.slide__inner');
        if (!isNaN(width) && innerSlide !== undefined && innerSlide !== null) {
            innerSlide.style.width = width + 'px';
        }
    });
};

const removeEmptySlides = slick => {
    // use reverse to prevent index changes when removing slides
    const slides = Array.from(slick.$slides).reverse();
    slides.forEach(slide => {
        const hasInnerSlide = slide.querySelector('.slide__inner');
        if (hasInnerSlide === null) {
            const slickIndex = slide.getAttribute('data-slick-index');
            slick.slickRemove(slickIndex);
        }
    });
};

const sliders = $('[data-slick]');
sliders.on('setPosition', function(event, slick) {
    adjustDimensions(slick);
});

sliders.on('init', function(event, slick) {
    adjustDimensions(slick);
    if ('neos' in window) {
        // For some reason we have in the neos backend for each slide one additional
        // empty slide. This is bit hacky way get rid of them.
        removeEmptySlides(slick);
    }
});

sliders.on('reinit', function(event, slick) {
    adjustDimensions(slick);
});

Array.from(sliders).forEach(slider => {
    const configuration = slider.getAttribute('data-slick');
    const configurationObject =
        configuration != '' ? JSON.parse(configuration) : {};
    $(slider).slick(configurationObject);
});
