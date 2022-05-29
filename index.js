element = document.getElementById("download")
element.onclick = async function() {
    console.log("Done")

    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      
      console.log({ id: currentTab.id, url: currentTab.url });

      newWin = window.open(currentTab.url)
      newWin.print()
      newWin.close()
    //   newWin.onload = function() { 
    //     console.log("Hello")
    //     newWin.print(); }
}