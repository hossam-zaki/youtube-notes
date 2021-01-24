chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  // window.location = chrome.runtime.getURL("popup.html");
  // alert(sender);
  alert(request);
  if (request === "createDiv") {
    //Code to create the div
    alert("aoweifjaowiefj");
    console.log("Created");
    var div = document.createElement("div");
    div.style.position = "fixed"; /* Sit on top of the page content */
    div.style.display = "block"; /* Hidden by default */
    div.style.width = "100%"; /* Full width (cover the whole page) */
    div.style.height = "10%"; /* Full height (cover the whole page) */
    div.style.top = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.backgroundColor = "#000000";
    div.style.opacity = 0.5; /* Black background with opacity */
    div.style.zIndex = 2; /* Specify a stack order in case you're using a different order for other elements */
    div.style.cursor = "pointer";

    var text = document.createElement("div");
    text.style.position = "absolute";
    text.style.top = "75%";
    text.style.left = "50%";
    text.style.fontSize = "20px";
    text.style.color = "white";
    text.style.transform = "translate(-50%,-50%)";
    text.style.transform;
    text.innerHTML = "Saved";
    div.appendChild(text);

    document.body.appendChild(div);

    await sleep(2000);
    div.style.display = "none";
    console.log("Loaded");
    sendResponse({ confirmation: "Successfully created div" });
  } else if (request === "takeNote") {
    alert("yes");
    const re = new RegExp("bear", "gi");
    const matches = document.documentElement.innerHTML.match(re);
    video = document.getElementsByClassName("video-stream")[0];
    console.log(video);
    console.log(video.currentTime);
    currentWindow = window.location.href;
    //   console.log(document.documentElement.innerHTML);
    //   ytplayer = document.getElementById(".html5-movie-player");
    //   alert(JSON.stringify(ytplayer));
    //   time = ytplayer.getCurrentTime();
    //   alert(time);
    sendResponse({ startTime: video.currentTime, currentTab: currentWindow });
  }
});
function CreateDiv() {
  console.log("Created");
  var div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.innerHTML = "Hello";
  document.body.appendChild(div);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// // document.addEventListener(
// //   "DOMContentLoaded",
// //   function () {
// //     document.querySelector("button").addEventListener("click", onclick, false);

// //     var port = chrome.runtime.connect();

// //     function onclick() {
// //       port.postMessage({
// //         from: "popup",
// //         start: "Y",
// //       });
// //       //   alert(document.documentElement.innerHTML);
// //       //   //document.querySelector('.video-stream').getCurrentTime()
// //       //   ytplayer = document.getElementById("movie_player");
// //       //   time = document.querySelector(".video-stream").getCurrentTime();
// //       //   startTime = Math.max(0, time - 30);
// //       //   endTime = time + 30;
// //       //   data = {
// //       //     userID: "",
// //       //     youtubeURL: window.location.href,
// //       //     startTime: startTime,
// //       //     endTime: endTime,
// //       //   };

// //       //   console.log(data);
// //       //   $.ajax({
// //       //     url: "localhost:5000/api/register_note",
// //       //     type: "POST",
// //       //     data: data,
// //       //     contentType: "application/json; charset=utf-8",
// //       //     dataType: "json",
// //       //     async: false,
// //       //     success: function (msg) {
// //       //       alert(msg);
// //       //     },
// //       //   });
// //     }

// //     function setCount(res) {
// //       const div = document.createElement("div");
// //       div.textContent = `${res.count} bears`;
// //       document.body.appendChild(div);
// //     }
// //   },
// //   false
// // );

// //alert('Grrr.')
// // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// //   const re = new RegExp('bear', 'gi')
// //   const matches = document.documentElement.innerHTML.match(re)
// //   sendResponse({count: matches.length})
// // })

// const re = new RegExp("bear", "gi");
// const matches = document.documentElement.innerHTML.match(re) || [];

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length,
// });
