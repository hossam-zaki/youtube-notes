document.addEventListener(
  "DOMContentLoaded",
  function () {
    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach(function (url) {
    //   const div = document.createElement('div')
    //   div.textContent = `${url}: ${bg.bears[url]}`
    //   document.body.appendChild(div)
    // })
    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi", setCount);
      });
    }

    function setCount(res) {
      const div = document.createElement("div");
      div.textContent = `${res.startTime} bears`;
      document.body.appendChild(div);
      time = res.startTime;
      startTime = Math.max(0, time - 30);
      endTime = time + 30;
      data = {
        userID: "",
        youtubeURL: res.currentTab,
        startTime: startTime,
        endTime: endTime,
        note: "",
      };
      $.ajax({
        url: "http://localhost:5000/api/register_note",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (msg) {
          alert(msg);
        },
      });
    }
  },
  false
);
