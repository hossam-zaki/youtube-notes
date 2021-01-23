chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   const re = new RegExp("bear", "gi");
  //   const matches = document.documentElement.innerHTML.match(re);
  video = document.getElementsByClassName("video-stream")[0];
  console.log(video);
  console.log(video.currentTime);
  //   console.log(document.documentElement.innerHTML);
  //   ytplayer = document.getElementById(".html5-movie-player");
  //   alert(JSON.stringify(ytplayer));
  //   time = ytplayer.getCurrentTime();
  //   alert(time);
  sendResponse({ startTime: video.currentTime });
});

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
