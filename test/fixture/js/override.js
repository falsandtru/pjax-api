$.pjax({
  callbacks: {
    update: {
      url: {
        after: function () {
          window.history.replaceState(null, 'override', window.location.pathname.replace(/\w+\.html$/, 'override.html'))
          return false;
        }
      }
    }
  }
});