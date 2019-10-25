import { isNil, getSliderPositionByIndex, getItemByKeyValue } from '../';

const removeSlideForElement = (
    element,
    sliderElements,
    slideMetaInformation
) => {
    const identifier = element.getAttribute('data-slide-identifier');
    let selectSlide = getItemByKeyValue(
        slideMetaInformation,
        'identifier',
        identifier
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
            slider.slider.slickRemove(sliderPosition);
        }
    }
};

export default removeSlideForElement;
