
document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        autoWidth: true,
        drag: true,
        arrows: false
    }).mount();
});