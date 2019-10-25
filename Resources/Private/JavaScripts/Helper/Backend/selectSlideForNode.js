import { isNil, getSliderPositionByIndex, getItemByKeyValue } from '../';

const getSlideByChildNode = (node, slideMetainformation) => {
    let selectSlide = null;
    slideMetainformation.forEach(slide => {
        if (node.contextPath.includes(slide.identifier)) {
            selectSlide = slide;
        }
    });

    return selectSlide;
};

const selectSlideForNode = (node, sliderElements, slideMetaInformation) => {
    let selectSlide = getItemByKeyValue(
        slideMetaInformation,
        'identifier',
        node.name
    );

    if (isNil(selectSlide)) {
        selectSlide = getSlideByChildNode(node, slideMetaInformation);
    }

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
