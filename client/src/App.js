/*global chrome*/

import FileSaver from "file-saver";
import axios from "axios";

import './App.css';

function App() {
  
  	// const callAPI = () => {
		let random_num = Math.floor(10000000 + Math.random() * 90000000)
		console.log(random_num);
	
	// 	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	// 		let url = tabs[0].url;

	// 		console.log(tabs[0].id);
	// 		console.log(tabs[0].title);
	// 		console.log(url);

	// 		chrome.cookies.getAll({ url }, (cookies) => {
	// 			console.log(cookies);

	// 			axios
	// 				.post(
	// 					"http://107.109.215.118:9000/testAPI",
	// 					{
	// 						Url: url,
	// 						cookies: cookies,
	// 					},
	// 					{
	// 						responseType: "arraybuffer",
	// 						headers: {
	// 							Accept: "application/pdf",
	// 						},
	// 					}
	// 				)
	// 				.then((response) => {
	// 					console.log(typeof response.data);
	// 					console.log("2nd time: " + url);
	// 					console.log("2nd time: " + cookies);
	// 					FileSaver.saveAs(
	// 						new Blob([response.data], { type: "application/pdf" }),
	// 						tabs[0].title + "_" + random_num + `.pdf`
	// 					);
	// 				});
	// 		});
	// 	});
	// };
  
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
 
  // return callAPI();
  return (
    <div className="App">
      Hello
      <button onClick = { callAPI }>Button</button>
    </div>
  );
}

export default App;
