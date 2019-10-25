import { isNil } from '../';

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

export default removeEmptySlides;
