document.body.addEventListener('click', evt => {
    const el = evt.target;
    if (el.nodeName.toLowerCase() === 'a') {
        chrome.tabs.create({ url: el.href });
    }
});

// listen icon load fail
document.addEventListener('error', err => {
    const el = err.target;
    if (el.nodeName === 'IMG') {
        el.style.display = 'none';
    }
}, true)

const listEl = document.querySelector('#sitesList');
chrome.topSites.get(topSites => {
    listEl.innerHTML = '';
    if (topSites && Array.isArray(topSites) && topSites.length > 0) {
        let html = '';
        topSites.forEach(site => {
            const url = new URL(site.url);
            const iconImg = `${url.protocol}//${url.host}/favicon.ico`;
            html += `<li>
                <a href="${url.href}" title="${site.title}"><span><img src="${iconImg}"/></span>${site.title}</a>
            </li>`;
        });
        listEl.innerHTML = html;
    }
});
