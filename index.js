element = document.getElementById("download")

function scriptExecute() {
    var s = document.documentElement.outerHTML; 
    chrome.runtime.sendMessage({action: "getSource", source: s});
}

element.onclick = async function() {
    console.log("Done")

    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
      
    console.log({ id: currentTab.id, url: currentTab.url });

    // newWin = window.open(currentTab.url)
    // newWin = window.focus()
    // newWin = window.print()
    // newWin = window.close()

    chrome.runtime.onMessage.addListener(function(request, sender) {
        if (request.action == "getSource") {
            this.pageSource = request.source;
            var title = this.pageSource.match(/<title[^>]*>([^<]+)<\/title>/)[1];

            alert(title)

            let html = this.pageSource;
            console.log(typeof html)

            let parsedHtml = new DOMParser().parseFromString(html, "image/svg+xml")
            console.log(typeof parsedHtml)
            console.log(parsedHtml)

            var htmlBody = parsedHtml.getElementsByTagName("body");
            console.log(htmlBody) 

            // newWin = window.open();
            // newWin.document.write(parsedHtml);
            // newWin.print();
            // newWin.close();
        }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: scriptExecute,
            args: ["Hello"]
        });
    });
}