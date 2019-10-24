import $ from 'jquery';
import 'slick-carousel';
import {
    getCollectionValueByPath,
    getSliderPositionByIndex,
    getItemByKeyValue,
    isNil
} from './Helper';

const sliderElements = [];

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

const removeEmptySlides = slick => {
    // use reverse to prevent index changes when removing slides
    const slides = Array.from(slick.$slides).reverse();
    slides.forEach(slide => {
        const hasInnerSlide = slide.querySelector('.slide__inner');
        if (isNil(hasInnerSlide)) {
            const slickIndex = slide.getAttribute('data-slick-index');
            slick.slickRemove(slickIndex);
        }
    });
};

const collectSlideMetaInformation = () => {
    const slides = document.querySelectorAll('.slick-slide:not(.slick-cloned)');
    const slideData = [];
    slides.forEach(slide => {
        const innerSlide = slide.querySelector('.slide__inner');
        const parentSlider = $(slide).closest('.slick-slider');
        if (!isNil(innerSlide) && !isNil(parentSlider)) {
            slideData.push({
                index: slide.getAttribute('data-slick-index'),
                identifier: innerSlide.getAttribute('data-slide-identifier'),
                parentIdentifier: parentSlider.data('slider-identifier')
            });
        }
    });
    return slideData;
};

const selectSlideForNode = node => {
    const slideMetaInformation = collectSlideMetaInformation();
    const selectSlide = getItemByKeyValue(slideMetaInformation, 'identifier', node.name);
    if (!isNil(selectSlide)) {
        const slider = getItemByKeyValue(
            sliderElements,
            'identifier',
            selectSlide.parentIdentifier
        );
        const sliderPosition = getSliderPositionByIndex(
            Array.from(slider.slider.$slides),
            selectSlide.index
        );

        if (sliderPosition >= 0) {
            slider.slider.slickGoTo(sliderPosition);
        }
    }
};

const sliders = $('[data-slick]');
sliders.on('setPosition', function(event, slick) {
    adjustDimensions(slick);
});

sliders.on('init', function(event, slick) {
    if ('neos' in window) {
        const slider = slick.$slider.get(0);
        if (!isNil(slider)) {
            const identifier = slider.getAttribute('data-slider-identifier');
            sliderElements.push({ identifier: identifier, slider: slick });
        }

        // For some reason we have in the neos backend for each slide one additional
        // empty slide. This is bit hacky way get rid of them.
        removeEmptySlides(slick);
    }
    adjustDimensions(slick);
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

// list for the event Neos.NodeSelected in the neos backend to select a slide
if ('neos' in window) {
    document.addEventListener('Neos.NodeSelected', function(event) {
        const node = getCollectionValueByPath(event, 'detail.node');
        if (!isNil(node)) {
            selectSlideForNode(node);
        }
    });
}
