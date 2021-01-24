email = "";
chrome.identity.getProfileUserInfo(function (userInfo) {
  console.log(JSON.stringify(userInfo));
  // userInfo["id"];
  email = userInfo["email"];
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "takeNote", setCount);
  });
  const bg = chrome.extension.getBackgroundPage();
  function setCount(res) {
    const div = document.createElement("div");
    div.textContent = `${res.startTime} bears`;
    document.body.appendChild(div);
    time = res.startTime;
    startTime = Math.max(0, time - 30);
    endTime = time + 30;
    data = {
      userID: bg.email,
      youtubeURL: res.currentTab,
      startTime: startTime,
      endTime: endTime,
      note: "",
    };
    $.ajax({
      url: "http://localhost:5000/api/register-note",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: true,
      success: function (msg) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, "createDiv");
          }
        );
      },
    });
  }
});
