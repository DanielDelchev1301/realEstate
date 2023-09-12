export const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
    });
}, {threshold: 0.2});

export const observerBadge = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('showBadge', entry.isIntersecting);
    });
}, {threshold: 0.5});

export const observerMap = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('showMap', entry.isIntersecting);
    });
}, {threshold: 0.3});

export const observerTitles = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('showTitle', entry.isIntersecting);
    });
}, {threshold: 0.4});

export const observerDescriptions = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('showDescription', entry.isIntersecting);
    });
}, {threshold: 0.4});
