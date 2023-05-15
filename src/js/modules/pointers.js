import cookie from '@js/modules/cookie';

const pointers = {
    initialize() {
        const preferencesPointer = cookie.getCookie('preferences-pointer') === 'true';
        const profilePointer = cookie.getCookie('profile-pointer') === 'true';
        const skillViewPointer = cookie.getCookie('skill-view-pointer') === 'true';

        if (!preferencesPointer) {
            document.querySelector('.preferences-pointer').classList.remove('hide');
        }
        if (!profilePointer) {
            document.querySelector('.profile-pointer').classList.remove('hide');
        }
        if (!skillViewPointer) {
            document.querySelector('.skill-view-pointer').classList.remove('hide');
        }
    },
    hidePointer(pointer) {
        document.querySelector(`.${pointer}`).classList.add('hide');
        cookie.setCookie(pointer, true, 1);
    }
}

export default pointers;