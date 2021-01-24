isSettingsShown = true;

document.addEventListener("DOMContentLoaded", function () {
  // later fill in the latest token from the database
  document
    .querySelector("#submitTokenButton")
    .addEventListener("click", onReadwiseTokenSubmit, false);
  const bg = chrome.extension.getBackgroundPage();

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
      success: async function (msg) {
        var div = document.createElement("div");
        div.style.position = "fixed"; /* Sit on top of the page content */
        div.style.display = "block"; /* Hidden by default */
        div.style.width = "100%"; /* Full width (cover the whole page) */
        div.style.height = "5%"; /* Full height (cover the whole page) */
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
        text.style.top = "70%";
        text.style.left = "50%";
        text.style.fontSize = "20px";
        text.style.color = "white";
        text.style.transform = "translate(-50%,-50%)";
        text.style.transform;
        text.innerHTML = "Saved";
        div.appendChild(text);

        document.documentElement.appendChild(div);
        await sleep(2000);
        div.style.display = "none";
      },
    });
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
