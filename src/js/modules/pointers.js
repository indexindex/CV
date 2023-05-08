import cookie from '@js/modules/cookie';

const pointers = {
    initialize() {
        const cookiesAllowed = cookie.getCookie('cookies-allowed') === 'true';
        const preferencesPointer = cookie.getCookie('preferences-pointer') === 'true';
        const profilePointer = cookie.getCookie('profile-pointer') === 'true';
        const skillViewPointer = cookie.getCookie('skill-view-pointer') === 'true';

        if (cookiesAllowed) {

            if (preferencesPointer) {
                document.querySelector('.preferences-pointer').classList.add('hide');
            }
            if (profilePointer) {
                document.querySelector('.profile-pointer').classList.add('hide');
            }
            if (skillViewPointer) {
                document.querySelector('.skill-view-pointer').classList.add('hide');
            }
        }
    },
    hidePointer(pointer) {
        document.querySelector(`.${pointer}`).classList.add('hide');
        cookie.setCookie(pointer, true, 1);
    }
}

export default pointers;