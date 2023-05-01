chrome.runtime.onInstalled.addListener(() => {
    // chrome.contextMenus.create({
    //     "id": "sampleContextMenu",
    //     "title": "Sample Context Menu",
    //     "contexts": ["selection"]
    // });

    const filter = {
        url: [
            {
                urlMatches: 'https://core-econ.org/the-economy/book/text/0-3-contents.html',
            },
        ],
    };

    chrome.webNavigation.onCompleted.addListener(() => {
        console.info("The user has loaded my favorite website!");
    }, filter);
});