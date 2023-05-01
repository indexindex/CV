const cookie = {
    cookieBox: document.querySelector('#cookie-box'),
    acceptCookie: document.querySelector('.cookie-accept'),
    declineCookie: document.querySelector('.cookie-decline'),
    initialize() {
        const { cookieBox, acceptCookie, declineCookie } = this;

        // ? run if we have not accepted cookies
        if (!this.getCookie('cookies-allowed')) {
            setTimeout(() => {
                cookieBox.classList.add('prompt');

                acceptCookie.addEventListener('click', () => {
                    this.setCookie('cookies-allowed', true, 1);
                    cookieBox.classList.remove('prompt');
                })
    
                declineCookie.addEventListener('click', () => {
                    cookieBox.classList.remove('prompt');
                })
            }, 3000);
        }
    },
    setCookie(name, value, expire) {
        const cookiesAllowed = this.getCookie('cookies-allowed') === 'true';
        const date = new Date();

        if (cookiesAllowed || name === 'cookies-allowed') {
            // ? expire is counted in days
            date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        }
    },
    getCookie(name) {
        // ? array of cookies without ";"
        const cookiesArray = document.cookie.split('; ');
        // ? return the first match
        const requestedCookie = cookiesArray.find(cookie => cookie.startsWith(`${name}=`));
        let cookieValue;

        if (requestedCookie) {
            // ? split makes an array of 2 string pieces. first is property and second is value, we need value
            cookieValue = requestedCookie.split('=')[1];
        }

        return cookieValue;
    }
}

export default cookie;