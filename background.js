chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("In background js");

  chrome.browserAction.getBadgeText({ tabId: tab.id }, function (result) {
    // alert(result);
    badgeText = result;
  });

  setTimeout(function () {
    // alert("domagic: " + badgeText);

    if (typeof badgeText == "undefined" || badgeText == "") {
      chrome.browserAction.setBadgeText({ text: "ON", tabId: tab.id });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#00b31f", tabId: tab.id });
      badgeText = "ON";
    } else {
      chrome.browserAction.setBadgeText({ text: "", tabId: tab.id });
      badgeText = "";
    }

    chrome.tabs.executeScript(tab.id, {
      code:
        'if(document.designMode=="off"){document.designMode="on"}else{document.designMode="off"}',
    });
  }, 250);
});
