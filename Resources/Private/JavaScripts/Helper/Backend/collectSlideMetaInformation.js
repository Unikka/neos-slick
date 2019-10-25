import { isNil } from '../';

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

export default collectSlideMetaInformation;
