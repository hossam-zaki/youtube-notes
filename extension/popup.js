isSettingsShown = true;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // later fill in the latest token from the database
    document
      .querySelector("#settingsButton")
      .addEventListener("click", toggleView, false);

    document
      .querySelector("#mainButton")
      .addEventListener("click", toggleView, false);

    toggleView();

    function toggleView() {
      const mainPage = document.querySelector("#mainPage");
      const settingsPage = document.querySelector("#settingsPage");
      if (isSettingsShown) {
        mainPage.style.display = "block";
        settingsPage.style.display = "none";
      } else {
        mainPage.style.display = "none";
        settingsPage.style.display = "block";
      }
      isSettingsShown = !isSettingsShown;
    }

    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach(function (url) {
    //   const div = document.createElement('div')
    //   div.textContent = `${url}: ${bg.bears[url]}`
    //   document.body.appendChild(div)
    // })
    document
      .querySelector("#submitTokenButton")
      .addEventListener("click", onReadwiseTokenSubmit, false);

    function onReadwiseTokenSubmit() {
      var token = document.getElementById("readwiseToken").value;
      data = {
        userID: bg.email,
        readwiseID: token,
      };
      $.ajax({
        url: "http://localhost:5000/api/register-readwise",
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

    document.querySelector("#snip").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi", setCount);
      });
    }

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
          alert(msg);
        },
      });
    }
  },
  false
);
