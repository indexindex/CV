import '@scss/main.scss';
import cookie from '@js/modules/cookie';
import pointers from '@js/modules/pointers';
import preferences from '@js/modules/preferences';
import sectionObserver from '@js/modules/section-observer';
import toggleProfile from '@js/modules/toggle-profile';
import toggleSkillView from '@js/modules/toggle-skill-view';
import typeWriter from '@js/modules/typewriter';

// ? splide.js dependency: https://splidejs.com/
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

window.addEventListener('DOMContentLoaded', () => {
    preferences.initialize();
    
    setTimeout(() => {
        document.body.classList.remove('welcome');
        cookie.initialize();
        pointers.initialize();
        toggleProfile.initialize();
        toggleSkillView.initialize();

        // ? (prefers-reduced-motion: no-preference)
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !document.querySelector('html').classList.contains('no-motion')) {
            sectionObserver.initialize();

            typeWriter({
                text: 'Andri',
                target: '.main-section--name',
                speed: 100,
                delay: 0
            });
            typeWriter({
                text: 'Suvorov',
                target: '.main-section--name > span',
                speed: 100,
                delay: 500
            });
            typeWriter({
                text: 'Full-Stack Developer',
                target: '.main-section--profession',
                speed: 70,
                delay: 1300
            });
        }
    }, 1000);

    new Splide('#image-carousel', {
        rewind: true,
        speed: 200,
        rewindSpeed: 400,
        width: '271px', // ? img is 542px in width / 2
        height: '500px',
        perPage: 3,
        focus: 'center',
        pagination: false,
        easing: 'linear',
        drag: true,
        snap: true,
        lazyLoad: 'sequential',
        direction: 'ttb',
        isNavigation: true,
        breakpoints: {
            600: { rewind: false, arrows: false }
        }
    }).mount();
})