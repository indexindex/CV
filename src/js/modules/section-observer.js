import cookie from '@js/modules/cookie';

const sectionObserver = {
    sections: document.querySelectorAll('.cv-section'),
    initialize() {
        const { sections } = this;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('cv-section--show', entry.isIntersecting);
        
                // ? if we only want elements to appear once and stay
                if (cookie.getCookie('no-jumping') === 'true' && entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            })
        }, {
            threshold: 0,
            rootMargin: '-100px'
        })
        
        sections.forEach(section => { observer.observe(section); })
    }
}

export default sectionObserver;