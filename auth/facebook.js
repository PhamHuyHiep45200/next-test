export const loadSDK = () => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "970633574589757",
      cookie: true,
      xfbml: true,
      version: "v22.0",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    if (fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, "script", "facebook-jssdk");
};

export const loginFB = () => {
  FB.login(function (response) {
    console.log(response);
  });
};
