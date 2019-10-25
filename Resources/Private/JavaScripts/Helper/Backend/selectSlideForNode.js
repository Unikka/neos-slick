import { isNil, getSliderPositionByIndex, getItemByKeyValue } from '../';

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

const selectSlideForNode = (node, sliderElements) => {
    const slideMetaInformation = collectSlideMetaInformation();
    const selectSlide = getItemByKeyValue(
        slideMetaInformation,
        'identifier',
        node.name
    );
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

            // resize window to rerender the backend ui controls
            const resizeEvent = window.document.createEvent('UIEvents');
            resizeEvent.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(resizeEvent);
        }
    }
};

export default selectSlideForNode;
