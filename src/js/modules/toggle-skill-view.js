import cookie from '@js/modules/cookie';

const toggleSkillView = {
    roadmapView: document.querySelector('.roadmap-view'),
    listView: document.querySelector('.list-view'),
    skillsWrapper: document.querySelector('.skills__wrapper'),
    initialize() {
        const { roadmapView, listView, skillsWrapper } = this;
        const cookiesAllowed = cookie.getCookie('cookies-allowed') === 'true';
        const cookieListView = cookie.getCookie('list-view') === 'true';
    
        if (cookiesAllowed && cookieListView) {
            skillsWrapper.classList.add('list-view-active');
        }

        roadmapView.addEventListener('click', () => {
            skillsWrapper.classList.remove('list-view-active');
            cookie.setCookie('list-view', false, 1);
        })
        listView.addEventListener('click', () => {
            skillsWrapper.classList.add('list-view-active');
            cookie.setCookie('list-view', true, 1);
        })
    }
}

export default toggleSkillView;