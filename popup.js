const listEl = document.querySelector('#sitesList');

listEl.addEventListener('click', evt => {
    const linkEl = evt.target.closest('a');
    if (linkEl) {
        chrome.tabs.create({ url: linkEl.href });
    }
});

chrome.topSites.get(topSites => {
    listEl.innerHTML = '';
    if (topSites && Array.isArray(topSites) && topSites.length > 0) {
        let html = '';
        topSites.forEach(site => {
            html += `<li>
                <a href="${site.url}" title="${site.title}"><img src="chrome://favicon/${site.url}"/><span>${site.title}</span></a>
            </li>`;
        });
        listEl.innerHTML = html;
    }
});
