$.pjax({
  filter: function () { return /index\.html/.test('/' + this.pathname); }
});