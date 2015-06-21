function parseQuerystring() {
    var query = { }
    var params = window.location.search.replace(/^\?/, "").split("&")

    for (var i in params) {
        var param = params[i].split('=');
        query[ encodeURIComponent(param[0]) ] = decodeURIComponent(param[1])
    }
    return query
}

document.addEventListener("DOMContentLoaded", function() {
    var query = parseQuerystring()

    var iframe = document.createElement('iframe')
    iframe.setAttribute("src", query.url)

    document.querySelector("[data-element=container]").appendChild(iframe)

    document.querySelector("head title").text = query.title

    var title_element =  document.querySelector("[data-element=title]")
    title_element.innerText = query.title
    title_element.setAttribute("title", query.title)

    document.querySelector("[data-element=comments]").setAttribute("href", query.comments_url)

    document.querySelector("[data-element=url]").setAttribute("href", query.url)

    // Replace the chrome history item of this extension URL with the URL that
    // is framed. It makes for a better browsing history.
    chrome.history.addUrl({ url: query.url })
    chrome.history.deleteUrl({ url: window.location.href })
});
