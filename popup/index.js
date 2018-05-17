let key = document.querySelector("#key");
let sendBtn = document.querySelector("#send");
sendBtn.onclick = () => {
    sendBtn.value = "Wysano";
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            msg: "key",
            key: key.value
        }, (response) => {
            console.log(response)
        });
    });
};