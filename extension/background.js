email = "";
chrome.identity.getProfileUserInfo(function (userInfo) {
  console.log(JSON.stringify(userInfo));
  // userInfo["id"];
  email = userInfo["email"];
});
