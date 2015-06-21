function openNewBackgroundTab(url) {
    var a = document.createElement("a")
    a.href = url
    var evt = document.createEvent("MouseEvents")
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                       false, false, false, true, 0, null)
    a.dispatchEvent(evt)
}

// @todo handle links in .expando (post section) to be opened in new tabs.
// if ($(e.currentTarget).parents(".expando").size() > 0) {
//     $(e.currentTarget).attr("target", "_blank")
//     return
// }

// @todo handle comments link from lists to open in new tab.

var wrappers = document.querySelectorAll(".linklisting .link")

for (var i = 0; i < wrappers.length; i++) {
    (function() {
        var wrapper = wrappers[i]
        var link = wrapper.querySelector("a.title")

        link.addEventListener("click", function(e) {
            e.preventDefault()

            url = link.getAttribute("href")
            title = link.innerText
            commentsUrl = wrapper.querySelector("a.comments").getAttribute("href")

            if ( !/^http/.test(url) ) {
                openNewBackgroundTab(url)
                return
            }

            var query = [
                "url="+encodeURIComponent(url),
                "title="+encodeURIComponent(title),
                "comments_url="+encodeURIComponent(commentsUrl)
            ].join("&")

            var extensionTabUrl = "chrome-extension://" + chrome.runtime.id + "/reddit-frame.html?" + query
            chrome.runtime.sendMessage({ openTab: extensionTabUrl }, function(response) { })

        })
    })()
}
