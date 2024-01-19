(function () {
  var locale = window?.navigator?.language?.split("-")[0] || "ko";
  if (window?.location?.pathname === "/" && locale === "ko") {
    window.location.href = "/ko/";
  }
})();
