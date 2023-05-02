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
        // const getBackgroundPage = chrome.extension.getBackgroundPage()
        // console.log({ getBackgroundPage })
    }, filter);

    // chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    //     if (request.method == "getSelection") {
    //         console.log('onRequest:', window.getSelection().toString())
    //         sendResponse({ data: window.getSelection().toString() });
    //     }
    //     else
    //         sendResponse({}); // snub them.
    // })

    // chrome.runtime.onMessage.addListener(
    //     function (request, sender, sendResponse) {
    //         console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    //         if (request.selectedText) {
    //             console.log('sw:selectedText', selectedText)
    //         }
    //         if (request.greeting === "hello")
    //             sendResponse({ farewell: "goodbye" });
    //         if (request.method === 'getSelection') {
    //             console.log('onMessage:', window.getSelection().toString())
    //             sendResponse({ data: window.getSelection().toString() });
    //         }
    //     }
    // );
    chrome.runtime.onMessage.addListener((message, callback) => {
        console.log({ message })
        // const tabId = getForegroundTabId();
        if (message.selectedText) {
            // chrome.alarms.create({ delayInMinutes: 5 });
            console.log('sw:', { message })
            // callback()
        }
    });

    // chrome.runtime.sendMessage(
    //     extensionId?: string,
    //     message: any,
    //     options?: object,
    //     callback?: function,
    //   )


});