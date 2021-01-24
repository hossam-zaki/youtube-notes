isSettingsShown = true;

document.addEventListener("DOMContentLoaded", function () {
  // later fill in the latest token from the database
  const bg = chrome.extension.getBackgroundPage();

  data = { userID: bg.email };

  $.ajax({
    url: "http://localhost:5000/api/get-library",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: true,
    success: function (msg) {
      console.log(msg);
      var len = Object.keys(msg).length;
      div = document.getElementById("NoteLibrary");
      var string = "";
      for (var key in msg) {
        console.log(key);
        string += "<div class='row'>";

        string += "<div class='col'>";
        string += `<h2>${key}</h2>`;
        string += "</div>";
        string += "</div>";

        string += "<div class='col'>";
        for (let j = 0; j < msg[key].length; j++) {
          string += `<div class='row'>
            ${msg[key][j]["text"]}
          </div>`;
          url =
            msg[key][j]["source_url"] + "&t=" + `${msg[key][j]["location"]}`;
          string += `<a href=${url}>Link</a>`;
        }
        string += "</div>";
        string += "</div>";
      }
      div.innerHTML += string;
    },
  });
});

{
  /* <div class='row'>
  <div class='col-sm'>One of three columns</div>
  <div class='col-sm'>One of three columns</div>
  <div class='col-sm'>One of three columns</div>
</div>; */
}
