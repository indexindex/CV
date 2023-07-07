import cookie from '@js/modules/cookie';
import pointers from '@js/modules/pointers';
import sectionObserver from '@js/modules/section-observer';

const preferences = {
    container: document.querySelector('.preferences'),
    target: document.querySelector('.gear-solid'),
    profileImg: document.querySelector('.intro__profile > img'),
    colorInput1: document.querySelector('#primary-color-theme'),
    colorInput2: document.querySelector('#secondary-color-theme'),
    complimentaryInputs: document.querySelectorAll('.color-theme__complimentary-inputs--input'),
    colorThemeReset: document.querySelector('.color-theme__reset'),
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
        const { colorInput1, colorInput2, complimentaryInputs, colorThemeReset } = this;
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--color-primary');
        const primaryColorRGB = rootStyles.getPropertyValue('--color-primary-rgb');
        const secondaryColor = rootStyles.getPropertyValue('--color-secondary');
        const secondaryColorRGB = rootStyles.getPropertyValue('--color-secondary-rgb');

        const changeColor = (variable, color) => {
            document.documentElement.style.setProperty(variable, color);
        }

        const hexToRgb = (hex) => {
            hex = hex.replace('#', '');

            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            return `${r}, ${g}, ${b}`;
        }

        const inputChange = (variable, color, expire) => {
            changeColor(`--${variable}`, color);
            changeColor(`--${variable}-rgb`, hexToRgb(color));
            cookie.setCookie(`${variable}-set`, color, expire);
            cookie.setCookie(`${variable}-rgb-set`, hexToRgb(color), expire);
        }



        changeColor('--color-primary', cookie.getCookie('color-primary-set') || primaryColor);
        changeColor('--color-primary-rgb', cookie.getCookie('color-primary-rgb-set') || primaryColorRGB);
        changeColor('--color-secondary', cookie.getCookie('color-secondary-set') || secondaryColor);
        changeColor('--color-secondary-rgb', cookie.getCookie('color-secondary-rgb-set') || secondaryColorRGB);

        colorInput1.value = cookie.getCookie('color-primary-set') || primaryColor.trim();
        colorInput2.value = cookie.getCookie('color-secondary-set') || secondaryColor.trim();

        colorInput1.addEventListener('input', ({ target }) => { inputChange('color-primary', target.value, 1); })
        colorInput2.addEventListener('input', ({ target }) => { inputChange('color-secondary', target.value, 1); })

        complimentaryInputs.forEach(input => {
            switch(input.getAttribute('id')) {
                case 'red':
                    input.style.backgroundColor = '#c62d2d';
                    input.setAttribute('data-color-hex', '#c62d2d');
                    break;
                case 'green':
                    input.style.backgroundColor = '#2dc653';
                    input.setAttribute('data-color-hex', '#2dc653');
                    break;
                case 'purple':
                    input.style.backgroundColor = '#a02dc6';
                    input.setAttribute('data-color-hex', '#a02dc6');
                    break;
                case 'yellow':
                    input.style.backgroundColor = '#c6aa2d';
                    input.setAttribute('data-color-hex', '#c6aa2d');
                    break;
            }

            input.addEventListener('click', ({ target }) => { inputChange('color-secondary', target.getAttribute('data-color-hex'), 1); })
        })

        colorThemeReset.addEventListener('click', () => {
            colorInput1.value = primaryColor;
            colorInput2.value = secondaryColor;
            inputChange('color-primary', primaryColor, 0);
            inputChange('color-secondary', secondaryColor, 0);
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