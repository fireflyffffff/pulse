
const anchor = document.querySelector('.pageup');

anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const promo = document.querySelector('#up');
    promo.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});


window.addEventListener('scroll', () => {
    if (window.pageYOffset < 700) {
        anchor.hidden = true;
    } else {
        anchor.hidden = false;
    }
    
})




