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

# import subprocess
# import shutil

import sys
import os

from PyQt6.QtGui import QGuiApplication
from PyQt6.QtQml import QQmlApplicationEngine
from PyQt6.QtQuick import QQuickWindow
from PyQt6.QtCore import QObject, QProcess,QUrl, Qt

QQuickWindow.setSceneGraphBackend('software')

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine() 

engine.quit.connect(app.quit)
engine.load('./UI/main.qml')

win = engine.rootObjects()[0]
win.show()

process = QProcess()

# def is_admin():
#     try:
#         return ctypes.windll.shell32.IsUserAnAdmin()
#     except:
#         return False

def openWith():
    # shutil.rmtree("C:\Program Files\WindowsApps\SAMSUNGELECTRONICSCoLtd.SamsungNotes_4.3.66.0_x64__wyx1vj98g3asy")
    # os.system("Samsung Notes") # To open any program by their name recognized by windows

    # fileName = "D:\Projects-Adiba\FER\SCLabel.pdf"
    # fileName = "SCLabel.pdf"
    # fileName = r"C:\Users\adiba.hasan\Desktop\Work_progress_of_interns.xlsx"
    # fileName = r"C:\Users\adiba.hasan\Downloads\abc.pdf"
    fileName = r"C:\Users\adiba.hasan\Downloads\PDFSigQFormalRep.pdf"
    # fileName = r"C:\Users\adiba.hasan\Downloads\The Murder Of Roger Ackroyd ( PDFDrive ).pdf"
    
    # p = subprocess.Popen(["start explorer shell:appsfolder\SAMSUNGELECTRONICSCoLtd.SamsungNotes_wyx1vj98g3asy!App", fileName])
    # p = subprocess.Popen([os.system("start explorer shell:appsfolder\SAMSUNGELECTRONICSCoLtd.SamsungNotes_wyx1vj98g3asy!App"), fileName], shell = True, env=os.environ)
    # p = subprocess.Popen(["SamsungNotes.exe", fileName])
    # os.system("start /max shell:appsfolder\SAMSUNGELECTRONICSCoLtd.SamsungNotes_wyx1vj98g3asy!App " + fileName)
    # os.system("start /max shell:appsfolder\SAMSUNGELECTRONICSCoLtd.SamsungNotes_wyx1vj98g3asy!App")
    # os.system("start shell:appsfolder\SAMSUNGELECTRONICSCoLtd.SamsungNotes_wyx1vj98g3asy!App " + fileName)
    # os.system("start \"D:\Samsung Notes.link\" " + fileName)

    os.system("openwith " + fileName)

    print("\"Hello\"")
    
    # OR
    # os.startfile("path to application or any file") # Open any program, text or office document

# if is_admin():

button = win.findChild(QObject, "OpenButton")
button.messageRequired.connect(openWith)

button.clicked.connect(app.quit)

# button.clicked.connect(openWith) # works too
# else:
#     # Re-run the program with admin rights
#     print("Hello")
#     ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
#     print("after")

sys.exit(app.exec())

qml file: 

import QtQuick
import QtQuick.Controls.Basic
import QtQuick.Controls.Universal
import QtQuick.Layouts
import QtQuick.Window

ApplicationWindow {
    visible: true
    width: 300
    height: 200
    title: "Open With"
    flags: Qt.FramelessWindowHint | Qt.Window
    Universal.theme: Universal.Dark
    Universal.accent: Universal.Violet

     ColumnLayout{
        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter
        Button {
            signal messageRequired
            objectName: "OpenButton"
            text: "Open With Samsung Notes"
            onClicked: messageRequired()
    }
}
}
