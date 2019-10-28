import { getCollectionValueByPath, getItemByKeyValue, isNil } from '../';
import {
    collectSlideMetaInformation,
    removeEmptySlides,
    removeSlideForElement,
    selectSlideForNode
} from './';

const sliderElements = [];
let slideMetaInformation = [];

const applyBackendAdjustments = slick => {
    const slider = slick.$slider.get(0);
    if (!isNil(slider)) {
        const identifier = slider.getAttribute('data-slider-identifier');
        sliderElements.push({ identifier: identifier, slider: slick });
    }

    slideMetaInformation = collectSlideMetaInformation();
    // list for the event Neos.NodeSelected in the neos backend to select a slide
    document.addEventListener('Neos.NodeSelected', function(event) {
        const node = getCollectionValueByPath(event, 'detail.node');
        if (!isNil(node)) {
            selectSlideForNode(node, sliderElements, slideMetaInformation);
        }
    });

    // Remove slide from slick when node has been removed
    document.addEventListener('Neos.NodeRemoved', function(event) {
        const element = getCollectionValueByPath(event, 'detail.element');
        removeSlideForElement(element, sliderElements, slideMetaInformation);
    });

    // For some reason we have in the neos backend for each slide one additional
    // empty slide. This is bit hacky way get rid of them.
    removeEmptySlides(slick);
};

export default applyBackendAdjustments;
