chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  // window.location = chrome.runtime.getURL("popup.html");
  // alert(sender);
  if (request === "createDiv") {
    //Code to create the div
    console.log("Created");
    var main = document.getElementById("masthead-container");
    var div = document.createElement("div");
    div.style.position = "fixed"; /* Sit on top of the page content */
    div.style.display = "block"; /* Hidden by default */
    div.style.width = "100%"; /* Full width (cover the whole page) */
    div.style.height = "100%"; /* Full height (cover the whole page) */
    div.style.top = "0";
    div.style.left = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.backgroundColor = "#000000";
    div.style.opacity = 0.8; /* Black background with opacity */
    div.style.zIndex = 2; /* Specify a stack order in case you're using a different order for other elements */
    div.style.cursor = "pointer";

    var text = document.createElement("div");
    text.style.position = "absolute";
    text.style.top = "50%";
    text.style.left = "50%";
    text.style.fontSize = "20px";
    text.style.color = "white";
    text.style.transform = "translate(-50%,-50%)";
    text.style.transform;
    text.innerHTML = "Saved";
    div.appendChild(text);

    main.appendChild(div);

    await sleep(2000);
    div.style.display = "none";
    console.log("Loaded");
    sendResponse({ confirmation: "Successfully created div" });
  } else if (request === "takeNote") {
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
