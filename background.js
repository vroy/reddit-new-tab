chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.openTab) {
        // @todo Find out the index of current tab to have similar behaviour to
        //       the original background tab opening via cmd+click.
        chrome.tabs.create({ url: request.openTab, active: false })
    }
})
