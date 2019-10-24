const getSliderPositionByIndex = (slides, index) => {
    let position = -1;
    slides.forEach(slide => {
        const slideIndex = slide.getAttribute('data-slick-index');
        if (slideIndex === index) {
            position = slides.indexOf(slide);
        }
    });
    return position;
};

export default getSliderPositionByIndex;
