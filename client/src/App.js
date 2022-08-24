/*global chrome*/

import FileSaver from "file-saver";
import axios from "axios";

import './App.css';

function App() {
  
  const callAPI = async ()=> {
    console.log("Here")

    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    let id = currentTab.id
    let url = currentTab.url
    let title = currentTab.title
    var domain = url.hostname

    chrome.cookies.getAll({
      "url": url
    }, function(cookie) {
        axios.post("http://localhost:9000/generatePDF", {
          url: url,
          cookies: cookie
        }, {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
        }).then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          FileSaver(blob, title + ".pdf")
          console.log(response);
        }
      ); 
    });
  }

  return (
    <div className="App">
      Hello
      <button onClick = { callAPI }>Button</button>
    </div>
  );
}

export default App;
