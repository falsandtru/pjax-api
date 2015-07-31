$.pjax({
  bind: function (event, setting, orig, dest) {
    dest.pathname = dest.pathname.replace(/(?:()\.\w+|([^/.]*))$/, '$1.json');
    return [{
      url: dest.href,
      dataType: 'json',
      timeout: 2500
    }];
  },
  rewrite: function(document, area, host, data) {
    if (data.length === 0) {return;}
    $('h1', document).text(data[0].text);
  },
  cache: {
    click: true,
    popstate: true
  }
});