import './styles.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    once: true
});

const HEADER_LINKS = document.querySelectorAll('.header__navigation-item');
const HEADER_NAVIGATION_MARKER = document.querySelector('.header__navigation-marker');

const setActiveLink = selectedIndex => {
    HEADER_LINKS.forEach((headerLink, index) => {
        if (index !== selectedIndex) {
            headerLink.classList.remove('link_active');
        } else {
            headerLink.classList.add('link_active');
        }
    });
}

const moveNavigationMarker = selectedLink => {
    HEADER_NAVIGATION_MARKER.style.left = `${selectedLink.offsetLeft + selectedLink.offsetWidth / 2}px`;
}

HEADER_LINKS.forEach((headerLink, linkIndex) => {
    headerLink.addEventListener('click', event => {
        event.preventDefault();
        setActiveLink(linkIndex);
        moveNavigationMarker(headerLink);
    });
});

moveNavigationMarker(HEADER_LINKS[0]);



const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.querySelectorAll('[data-animate]')
                .forEach(item => item.classList.add('animated'));
            observer.unobserve(entry.target);
        }
    })
}, { threshold: [ 0.5 ] });

if (window.innerWidth <= 479) {
    document.querySelectorAll('.our-clients__column')
        .forEach(item => animationObserver.observe(item));
} else {
    animationObserver.observe(document.querySelector('.our-clients'));
}



document.querySelector('#back-to-top')
    .addEventListener('click', () => {
       window.scrollTo({
           top: 0,
           behavior: 'smooth'
       })
    });
