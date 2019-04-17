document.body.addEventListener('click', evt => {
    const el = evt.target;
    if (el.nodeName.toLowerCase() === 'a') {
        chrome.tabs.create({ url: el.href });
    }
});

const listEl = document.querySelector('#sitesList');
chrome.topSites.get(topSites => {
    listEl.innerHTML = '';
    if (topSites && Array.isArray(topSites) && topSites.length > 0) {
        let html = '';
        topSites.forEach(site => {
            html += `<li>
                <a href="${site.url}" title="${site.title}">${site.title}</a>
            </li>`;
        });
        listEl.innerHTML = html;
    }
});
