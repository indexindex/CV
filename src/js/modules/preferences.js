import cookie from '@js/modules/cookie';
import pointers from '@js/modules/pointers';
import sectionObserver from '@js/modules/section-observer';

const preferences = {
    container: document.querySelector('.preferences'),
    target: document.querySelector('.gear-solid'),
    profileImg: document.querySelector('.intro__profile > img'),
    colorInput1: document.querySelector('#primary-color-theme'),
    colorInput2: document.querySelector('#secondary-color-theme'),
    switcherSections: document.querySelector('#switcher-sections'),
    switcherMotion: document.querySelector('#switcher-motion'),
    initialize() {
        const { container, target, profileImg } = this;

        target.addEventListener('click', () => {
            container.classList.toggle('open');
            container.classList.add('unclickable');
            profileImg.classList.add('unclickable');
            pointers.hidePointer('preferences-pointer');

            setTimeout(() => {
                container.classList.remove('unclickable');

                if (!container.classList.contains('open')) {
                    profileImg.classList.remove('unclickable');
                }
            }, 1000);
        })

        this.colorTheme();
        this.reduceAnimations();
    },
    colorTheme() {
        const { colorInput1, colorInput2 } = this;
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--color-primary');
        const secondaryColor = rootStyles.getPropertyValue('--color-secondary');

        const changeColor = (variable, color) => {
            document.documentElement.style.setProperty(variable, color);
        }

        changeColor('--color-primary', cookie.getCookie('color-primary-set') || primaryColor);
        changeColor('--color-secondary', cookie.getCookie('color-secondary-set') || secondaryColor);

        colorInput1.value = cookie.getCookie('color-primary-set') || primaryColor.trim();
        colorInput2.value = cookie.getCookie('color-secondary-set') || secondaryColor.trim();

        colorInput1.addEventListener('change', ({ target }) => {
            changeColor('--color-primary', target.value);
            cookie.setCookie('color-primary-set', target.value, 1);
        })
        colorInput2.addEventListener('change', ({ target }) => {
            changeColor('--color-secondary', target.value);
            cookie.setCookie('color-secondary-set', target.value, 1);
        })
    },
    reduceAnimations() {
        const { switcherSections, switcherMotion } = this;
        const cookiesAllowed = cookie.getCookie('cookies-allowed') === 'true';
        const cookieNoMotion = cookie.getCookie('no-motion') === 'true';
    
        if (cookiesAllowed && cookieNoMotion) {
            document.querySelector('html').classList.add('no-motion');
        }

        switcherSections.checked = cookie.getCookie('no-jumping') === 'true' ? true : false;
        switcherMotion.checked = cookieNoMotion ? true : false;

        switcherSections.addEventListener('change', ({ target }) => {
            cookie.setCookie('no-jumping', target.checked, 1);
            if (!target.checked) { sectionObserver.initialize(); }
        })

        switcherMotion.addEventListener('change', ({ target }) => {
            cookie.setCookie('no-motion', target.checked, 1);

            target.checked ?
            document.querySelector('html').classList.add('no-motion') :
            document.querySelector('html').classList.remove('no-motion');
        })
    }
}

export default preferences;