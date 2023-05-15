import pointers from '@js/modules/pointers';

const toggleProfile = {
    container: document.querySelector('.intro__profile'),
    profileImg: document.querySelector('.intro__profile > img'),
    preferences: document.querySelector('.preferences'),
    initialize() {
        const { container, profileImg, preferences } = this;

        profileImg.addEventListener('click', () => {
            const isOpen = container.classList.contains('open');

            profileImg.classList.add('unclickable');

            if (isOpen) {
                // ? small animation reversal trick
                container.classList.remove('open');
                void container.offsetWidth;
                container.classList.add('open');
                container.classList.add('reverse');

                // ? small animation reversal trick
                preferences.classList.remove('hide');
                void preferences.offsetWidth;
                preferences.classList.add('hide');
                preferences.classList.add('show');

                setTimeout(() => {
                    container.classList.remove('open', 'reverse');
                    profileImg.classList.remove('unclickable');
                    preferences.classList.remove('unclickable', 'hide', 'show');
                }, 1000);
            } else {
                container.classList.add('open');
                preferences.classList.add('unclickable', 'hide');
                pointers.hidePointer('profile-pointer');

                setTimeout(() => { profileImg.classList.remove('unclickable'); }, 1000);
            }
        })
    }
}

export default toggleProfile;