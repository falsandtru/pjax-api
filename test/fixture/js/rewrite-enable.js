$.pjax({
  rewrite: function (doc, area) {
    $(area, doc).append('<p class="rewrite">rewrite</p>');
  }
});