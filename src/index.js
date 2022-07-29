import './styles.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    once: true
});

const SIDEBAR = document.getElementById('sidebar');
const BURGER_BUTTONS = document.querySelectorAll('.burger');

BURGER_BUTTONS.forEach(burger => {
    burger.addEventListener('click', () => {
        if (!burger.classList.contains('header__burger_active')) {
            SIDEBAR.classList.add('sidebar_show');
            BURGER_BUTTONS.forEach(item => item.classList.add('header__burger_active'));

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.querySelector('.header').appendChild(overlay);

            overlay.addEventListener('click', () => {
                BURGER_BUTTONS.forEach(item => item.classList.remove('header__burger_active'));
                SIDEBAR.classList.remove('sidebar_show');
                overlay.remove();
            });
        } else {
            document.querySelector('.overlay').dispatchEvent(new Event('click'));
        }
    })
});

let activeLinkIndex = 0;
const HEADER_LINKS = document.querySelectorAll('.header__navigation-item');
const HEADER_NAVIGATION_MARKER = document.querySelector('.header__navigation-marker');
const SIDEBAR_LINKS = document.querySelectorAll('.sidebar__navigation-item');

const setActiveLink = selectedIndex => {
    HEADER_LINKS.forEach((headerLink, index) => {
        if (index !== selectedIndex) {
            headerLink.classList.remove('link_active');
        } else {
            headerLink.classList.add('link_active');
            moveNavigationMarker(headerLink);
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
        activeLinkIndex = linkIndex;
    });
});

SIDEBAR_LINKS.forEach((sidebarLink, linkIndex) => {
    sidebarLink.addEventListener('click', event => {
        event.preventDefault();
        activeLinkIndex = linkIndex;
    });
});

setActiveLink(activeLinkIndex);

window.addEventListener('resize', () => {
    const overlay = document.querySelector('.overlay');
    if (window.innerWidth >= 1023) {
        setActiveLink(activeLinkIndex);

        if (overlay) {
            overlay.dispatchEvent(new Event('click'));
        }
    }
});



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
